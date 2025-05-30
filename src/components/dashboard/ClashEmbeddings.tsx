import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Loader2, Database } from 'lucide-react';
import { ClashMetadata, embedMultipleClashes, EmbeddingResult } from '../../utils/embeddings';

interface ClashEmbeddingsProps {
  clashes: ClashMetadata[];
}

const ClashEmbeddings: React.FC<ClashEmbeddingsProps> = ({ clashes }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<EmbeddingResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateEmbeddings = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      const embeddings = await embedMultipleClashes(clashes);
      setResults(embeddings);
      
      // Here you could send the embeddings to your vector database
      // or return them for downstream processing
      console.log('Generated embeddings:', embeddings);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate embeddings');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Clash Embeddings
          </h2>
          <Button
            onClick={handleGenerateEmbeddings}
            disabled={isProcessing || clashes.length === 0}
            leftIcon={isProcessing ? <Loader2 className="animate-spin" size={16} /> : <Database size={16} />}
          >
            {isProcessing ? 'Processing...' : 'Generate Embeddings'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}
        
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {clashes.length > 0 ? (
            <p>Generate embeddings for {clashes.length} clashes to enable semantic search and analysis.</p>
          ) : (
            <p>No clashes available for embedding generation.</p>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Generated Embeddings
            </h3>
            <div className="space-y-2">
              {results.map((result) => (
                <div 
                  key={result.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm"
                >
                  <div className="font-medium text-slate-900 dark:text-white mb-1">
                    Clash {result.id}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Vector dimensions: {result.embedding.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClashEmbeddings;