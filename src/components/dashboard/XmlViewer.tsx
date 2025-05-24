import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { Upload, FileCheck, AlertCircle, BarChart4, PieChart, ListFilter } from 'lucide-react';
import Button from '../ui/Button';
import ClashAnalysis from './ClashAnalysis';

interface ClashStats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byLocation: Record<string, number>;
  byElement: Record<string, number>;
}

const XmlViewer: React.FC = () => {
  const [xmlData, setXmlData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'raw' | 'analytics'>('analytics');
  const [clashStats, setClashStats] = useState<ClashStats | null>(null);

  const calculateClashStats = (data: any): ClashStats => {
    const stats: ClashStats = {
      total: 0,
      byType: {},
      byStatus: {},
      byLocation: {},
      byElement: {}
    };

    const clashes = data.clashdetective?.batchtest?.clashtests?.clashtest || [];
    stats.total = clashes.length;

    clashes.forEach((clash: any) => {
      // Count by type
      const type = clash['@_type'] || 'Unknown';
      stats.byType[type] = (stats.byType[type] || 0) + 1;

      // Count by status
      const status = clash['@_status'] || 'Unknown';
      stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

      // Count by location
      const location = clash.location || 'Unspecified';
      stats.byLocation[location] = (stats.byLocation[location] || 0) + 1;

      // Count by element type
      if (clash.elements?.element) {
        const elements = Array.isArray(clash.elements.element) 
          ? clash.elements.element 
          : [clash.elements.element];
        
        elements.forEach((element: any) => {
          const elementType = element['@_type'] || 'Unknown';
          stats.byElement[elementType] = (stats.byElement[elementType] || 0) + 1;
        });
      }
    });

    return stats;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
        setClashStats(calculateClashStats(result));
        setError(null);
      } catch (err) {
        setError('Failed to parse XML file. Please ensure it is valid XML.');
        setXmlData(null);
        setClashStats(null);
      }
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    reader.readAsText(file);
  };

  const renderAnalytics = () => {
    if (!clashStats) return null;

    const renderChart = (data: Record<string, number>, title: string) => (
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white">{title}</h3>
        <div className="space-y-2">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">{key}</span>
                <span className="font-medium text-slate-900 dark:text-white">{value}</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(value / clashStats.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            {renderChart(clashStats.byType, 'Clashes by Type')}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            {renderChart(clashStats.byStatus, 'Clashes by Status')}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            {renderChart(clashStats.byLocation, 'Clashes by Location')}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            {renderChart(clashStats.byElement, 'Clashes by Element Type')}
          </div>
        </div>
      </div>
    );
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
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'analytics' ? 'primary' : 'outline'}
                  size="sm"
                  leftIcon={<BarChart4 size={16} />}
                  onClick={() => setViewMode('analytics')}
                >
                  Analytics
                </Button>
                <Button
                  variant={viewMode === 'raw' ? 'primary' : 'outline'}
                  size="sm"
                  leftIcon={<ListFilter size={16} />}
                  onClick={() => setViewMode('raw')}
                >
                  Raw Data
                </Button>
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
                    size="sm"
                    className="pointer-events-none"
                    leftIcon={<Upload size={16} />}
                  >
                    Upload XML
                  </Button>
                </div>
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
                {clashStats && (
                  <span className="ml-2 text-sm">
                    ({clashStats.total} clashes found)
                  </span>
                )}
              </div>
              {viewMode === 'analytics' ? (
                renderAnalytics()
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 overflow-auto max-h-96">
                  {renderValue(xmlData)}
                </div>
              )}
            </div>
          )}
          
          {!xmlData && !error && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              Upload an XML file to view its contents and analytics
            </div>
          )}
        </CardContent>
      </Card>

      {xmlData && <ClashAnalysis xmlData={xmlData} />}
    </div>
  );
};

export default XmlViewer;