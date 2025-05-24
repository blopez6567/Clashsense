import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { Upload, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

type Provider = 'openai' | 'google';

const ClashImageParser: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider>('openai');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setIsLoading(true);
    setAnalysis(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('provider', selectedProvider);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-clash-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedProvider]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
  });

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quick Clash Analysis</h2>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Analysis Provider
            </label>
            <div className="flex space-x-4">
              <Button
                variant={selectedProvider === 'openai' ? 'primary' : 'outline'}
                onClick={() => setSelectedProvider('openai')}
              >
                OpenAI Vision
              </Button>
              <Button
                variant={selectedProvider === 'google' ? 'primary' : 'outline'}
                onClick={() => setSelectedProvider('google')}
              >
                Google Vision AI
              </Button>
            </div>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              {isDragActive
                ? 'Drop the clash image here...'
                : 'Drag & drop a clash image, or click to select one'}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              Supports PNG, JPG up to 10MB
            </p>
          </div>

          {previewUrl && (
            <div className="mt-6">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Clash preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mt-6 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Analyzing clash image with {selectedProvider === 'openai' ? 'OpenAI' : 'Google Vision'}...
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
              <Button className="mt-4" onClick={() => {
                setPreviewUrl(null);
                setError(null);
              }}>
                Try Again
              </Button>
            </div>
          )}

          {analysis && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Analysis Results
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {analysis}
                </p>
              </div>
              <Button className="mt-4" onClick={() => {
                setPreviewUrl(null);
                setAnalysis(null);
              }}>
                Analyze Another Image
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ClashImageParser;