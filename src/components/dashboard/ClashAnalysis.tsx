import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Brain, Loader2, AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface ClashAnalysisProps {
  xmlData: any;
}

interface AnalysisResponse {
  analysis: string;
  analyzedClashes: number;
  totalClashes: number;
  error?: string;
  message?: string;
  mlSuggestions?: Array<{
    id: string;
    confidence: number;
    suggestion: string;
    precedents: Array<{
      description: string;
      similarity: number;
    }>;
  }>;
}

const MAX_RETRIES = 3;
const INITIAL_DELAY = 2000;
const BATCH_SIZE = 3;

const ClashAnalysis: React.FC<ClashAnalysisProps> = ({ xmlData }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retrying, setRetrying] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const makeAnalysisRequest = async (clashBatch: any[]): Promise<AnalysisResponse> => {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/clash-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ 
        clashData: clashBatch,
        enableMl: true, // Enable ML-powered analysis
        includeHistory: true // Include historical resolution data
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('API rate limit exceeded');
      }
      throw new Error(data.message || 'Failed to analyze clashes');
    }

    return data;
  };

  const processBatch = async (clashes: any[], startIndex: number): Promise<AnalysisResponse> => {
    const batch = clashes.slice(startIndex, startIndex + BATCH_SIZE);
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          setRetrying(true);
          const delay = INITIAL_DELAY * Math.pow(2, attempt - 1);
          await sleep(delay);
        }

        const result = await makeAnalysisRequest(batch);
        setRetrying(false);
        return result;
      } catch (err) {
        lastError = err as Error;
        if (err instanceof Error && err.message.includes('rate limit')) {
          setRetryCount(attempt + 1);
          continue;
        }
        throw err;
      }
    }

    throw lastError || new Error('Maximum retries exceeded');
  };

  const analyzeClashes = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setRetryCount(0);
    setRetrying(false);

    try {
      const formattedData = formatClashData(xmlData);
      const clashes = formattedData.clashes;
      setProgress({ current: 0, total: clashes.length });

      let combinedAnalysis = '';
      let totalAnalyzed = 0;
      let mlSuggestions: AnalysisResponse['mlSuggestions'] = [];

      for (let i = 0; i < clashes.length; i += BATCH_SIZE) {
        try {
          const batchResult = await processBatch(clashes, i);
          combinedAnalysis += (combinedAnalysis ? '\n\n' : '') + batchResult.analysis;
          totalAnalyzed += batchResult.analyzedClashes;
          
          if (batchResult.mlSuggestions) {
            mlSuggestions = [...mlSuggestions, ...batchResult.mlSuggestions];
          }
          
          setProgress({ current: totalAnalyzed, total: clashes.length });
          
          if (i + BATCH_SIZE < clashes.length) {
            await sleep(1000);
          }
        } catch (err) {
          if (err instanceof Error && err.message.includes('rate limit')) {
            throw new Error(
              'Rate limit exceeded. Please try again in a few minutes. ' +
              `Progress saved: ${totalAnalyzed}/${clashes.length} clashes analyzed.`
            );
          }
          throw err;
        }
      }

      setAnalysis({
        analysis: combinedAnalysis,
        analyzedClashes: totalAnalyzed,
        totalClashes: clashes.length,
        mlSuggestions
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze clashes';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  const formatClashData = (data: any) => {
    const clashes = data.clashdetective?.batchtest?.clashtests?.clashtest || [];
    
    return {
      projectName: data.clashdetective?.projectname || 'Unknown Project',
      clashes: clashes.map((clash: any) => ({
        id: clash['@_name'],
        type: clash['@_type'],
        status: clash['@_status'],
        description: clash.description,
        location: clash.location,
        elements: clash.elements
      }))
    };
  };

  const renderMlSuggestions = (suggestions: AnalysisResponse['mlSuggestions']) => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
          ML-Powered Resolution Suggestions
        </h3>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-900 dark:text-white">
                Clash #{suggestion.id}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {suggestion.confidence}% confidence
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              {suggestion.suggestion}
            </p>
            {suggestion.precedents.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Similar Past Resolutions:
                </h4>
                <div className="space-y-2">
                  {suggestion.precedents.map((precedent, index) => (
                    <div key={index} className="text-sm text-slate-600 dark:text-slate-400">
                      • {precedent.description} ({precedent.similarity}% similar)
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">AI Clash Analysis</h2>
          <div className="flex items-center gap-2">
            <div onClick={e => e.stopPropagation()}>
              <Button
                onClick={analyzeClashes}
                disabled={loading || !xmlData}
                leftIcon={loading ? (
                  retrying ? (
                    <RefreshCw className="animate-spin" size={16} />
                  ) : (
                    <Loader2 className="animate-spin" size={16} />
                  )
                ) : (
                  <Brain size={16} />
                )}
              >
                {loading ? (
                  retrying ? `Retrying (${retryCount}/${MAX_RETRIES})...` : 'Analyzing...'
                ) : (
                  'Analyze Clashes'
                )}
              </Button>
            </div>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {error && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg flex items-start gap-3">
              <AlertTriangle className="flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium">Analysis Failed</p>
                <p className="mt-1">{error}</p>
                {error.includes('rate limit') && (
                  <p className="mt-2 text-sm">
                    The analysis is being rate limited. This usually happens when processing many clashes at once.
                    Try again in a few minutes or consider uploading a smaller XML file.
                  </p>
                )}
              </div>
            </div>
          )}

          {loading && progress.total > 0 && (
            <div className="mb-4">
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Analyzing clashes: {progress.current} of {progress.total}
              </p>
            </div>
          )}

          {analysis && (
            <div className="prose dark:prose-invert max-w-none">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white m-0">
                    Analysis Results
                  </h3>
                  {analysis.analyzedClashes < analysis.totalClashes && (
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Analyzed {analysis.analyzedClashes} of {analysis.totalClashes} clashes
                    </span>
                  )}
                </div>
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                  {analysis.analysis}
                </div>
                {analysis.mlSuggestions && renderMlSuggestions(analysis.mlSuggestions)}
              </div>
            </div>
          )}

          {!analysis && !error && !loading && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              Upload an XML file and click "Analyze Clashes" to get AI-powered resolution suggestions
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ClashAnalysis;