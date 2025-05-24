import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Brain, Loader2 } from 'lucide-react';

interface ClashAnalysisProps {
  xmlData: any;
}

const ClashAnalysis: React.FC<ClashAnalysisProps> = ({ xmlData }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeClashes = async () => {
    setLoading(true);
    setError(null);

    try {
      const clashData = formatClashData(xmlData);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/clash-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ clashData }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze clashes');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError('Failed to analyze clashes. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatClashData = (data: any) => {
    // Extract relevant clash information from XML data
    // This is a simplified example - adjust based on your XML structure
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
            leftIcon={loading ? <Loader2 className="animate-spin" size={16} /> : <Brain size={16} />}
          >
            {loading ? 'Analyzing...' : 'Analyze Clashes'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {analysis && (
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                Analysis Results
              </h3>
              <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                {analysis}
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