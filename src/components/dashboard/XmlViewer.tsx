import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import ClashAnalysis from './ClashAnalysis';

const XmlViewer: React.FC = () => {
  const [xmlData, setXmlData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept .xml files
    if (!file.name.toLowerCase().endsWith('.xml')) {
      setError('Please upload a valid XML file');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_"
        });
        const result = parser.parse(e.target?.result as string);
        setXmlData(result);
        setError(null);
      } catch (err) {
        setError('Failed to parse XML file. Please ensure it is valid XML.');
        setXmlData(null);
      }
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    reader.readAsText(file);
  };

  const renderValue = (value: any): JSX.Element => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="mt-2">
              <span className="font-medium text-blue-600 dark:text-blue-400">{key}:</span>
              {renderValue(val)}
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-slate-700 dark:text-slate-300 ml-2">{value}</span>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">XML Model Data</h2>
            <div className="flex items-center gap-4">
              {fileName && (
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {fileName}
                </span>
              )}
              <div className="relative">
                <input
                  type="file"
                  accept=".xml"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="xml-upload"
                />
                <Button
                  variant="outline"
                  className="pointer-events-none"
                  leftIcon={<Upload size={16} />}
                >
                  Upload XML
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center p-4 text-amber-800 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 rounded-lg">
              <AlertCircle size={20} className="mr-2" />
              {error}
            </div>
          )}
          
          {xmlData && (
            <div className="mt-4">
              <div className="flex items-center text-emerald-600 dark:text-emerald-400 mb-4">
                <FileCheck size={20} className="mr-2" />
                XML file parsed successfully
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 overflow-auto max-h-96">
                {renderValue(xmlData)}
              </div>
            </div>
          )}
          
          {!xmlData && !error && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              Upload an XML file to view its contents
            </div>
          )}
        </CardContent>
      </Card>

      {xmlData && <ClashAnalysis xmlData={xmlData} />}
    </div>
  );
};

export default XmlViewer;