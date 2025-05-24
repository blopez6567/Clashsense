import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Brain, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

interface ClashAnalysisProps {
  xmlData: any;
}

interface AnalysisResponse {
  analysis: string;
  analyzedClashes: number;
  totalClashes: number;
  error?: string;
  message?: string;
}

const MAX_RETRIES = 3;
const INITIAL_DELAY = 2000; // 2 seconds

const ClashAnalysis: React.FC<ClashAnalysisProps> = ({ xmlData }) => {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retrying, setRetrying] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const makeAnalysisRequest = async (clashData: any): Promise<AnalysisResponse> => {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/clash-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ clashData }),
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

  const analyzeClashes = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setRetryCount(0);
    setRetrying(false);

    try {
      const clashData = formatClashData(xmlData);
      let lastError: Error | null = null;

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          if (attempt > 0) {
            setRetrying(true);
            const delay = INITIAL_DELAY * Math.pow(2, attempt - 1);
            await sleep(delay);
          }

          const data = await makeAnalysisRequest(clashData);
          setAnalysis(data);
          setRetrying(false);
          return;
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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">AI Clash Analysis</h2>
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
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg flex items-start gap-3">
            <AlertTriangle className="flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium">Analysis Failed</p>
              <p className="mt-1">{error}</p>
              {error.includes('rate limit') && retryCount >= MAX_RETRIES && (
                <p className="mt-2 text-sm">
                  Maximum retries exceeded. Please try again in a few minutes.
                </p>
              )}
            </div>
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
            </div>
          </div>
        )}

        {!analysis && !error && !loading && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Upload an XML file and click "Analyze Clashes" to get AI-powered resolution suggestions
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClashAnalysis;