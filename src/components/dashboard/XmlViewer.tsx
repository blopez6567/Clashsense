import React, { useState, useCallback } from 'react';
import { XMLParser } from 'fast-xml-parser';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { Upload, FileCheck, AlertCircle, BarChart4, ListFilter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';
import ClashAnalysis from './ClashAnalysis';
import { ClashTask } from '../../types';

interface XmlViewerProps {
  onXmlDataParsed: (data: any, clashes: ClashTask[]) => void;
}

interface ClashStats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byLocation: Record<string, number>;
  byElement: Record<string, number>;
  byDiscipline: Record<string, number>;
  bySeverity: Record<string, number>;
  byLevel: Record<string, number>;
  byGroup: Record<string, number>;
  resolutionRate: number;
  criticalIssues: number;
  averageClashesPerLevel: number;
  topLocations: Array<{ location: string; count: number }>;
  disciplineBreakdown: Array<{ discipline: string; count: number; resolved: number }>;
}

const XmlViewer: React.FC<XmlViewerProps> = ({ onXmlDataParsed }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [xmlData, setXmlData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'raw' | 'analytics'>('analytics');
  const [clashStats, setClashStats] = useState<ClashStats | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const parseClashesToTasks = (data: any): ClashTask[] => {
    const clashes = data.clashdetective?.batchtest?.clashtests?.clashtest || [];
    return clashes.map((clash: any) => {
      const name = clash['@_name'] || `CLASH-${Math.random().toString(36).substr(2, 9)}`;
      const locationInfo = parseLocationInfo(clash.location || '');
      
      const elements = Array.isArray(clash.elements?.element) 
        ? clash.elements.element 
        : clash.elements?.element 
          ? [clash.elements.element] 
          : [];

      const elementDetails = elements.map((element: any) => ({
        type: element['@_type'] || 'Unknown',
        model: element['@_model'] || 'Unknown',
        coordinates: element['@_coordinates'] || ''
      }));

      return {
        id: name,
        description: clash.description || `Clash between ${elementDetails.map(e => e.type).join(' and ')}`,
        discipline: determineDiscipline(clash, elementDetails),
        severity: determineSeverity(clash),
        status: (clash['@_status'] || 'new').toLowerCase(),
        location: locationInfo.location,
        level: locationInfo.level,
        date: clash['@_date'] || new Date().toISOString(),
        modelSource: elementDetails[0]?.model || 'Unknown',
        elementType: elementDetails[0]?.type || 'Unknown',
        clashGroup: determineClashGroup(locationInfo.location),
        assignedTo: clash['@_assigned'] || 'Unassigned',
        coordinates: elementDetails[0]?.coordinates || ''
      };
    });
  };

  const calculateClashStats = (clashes: ClashTask[]): ClashStats => {
    const stats: ClashStats = {
      total: clashes.length,
      byType: {},
      byStatus: {},
      byLocation: {},
      byElement: {},
      byDiscipline: {},
      bySeverity: {},
      byLevel: {},
      byGroup: {},
      resolutionRate: 0,
      criticalIssues: 0,
      averageClashesPerLevel: 0,
      topLocations: [],
      disciplineBreakdown: []
    };

    // Calculate basic counts
    clashes.forEach(clash => {
      stats.byType[clash.elementType] = (stats.byType[clash.elementType] || 0) + 1;
      stats.byStatus[clash.status] = (stats.byStatus[clash.status] || 0) + 1;
      stats.byLocation[clash.location] = (stats.byLocation[clash.location] || 0) + 1;
      stats.byElement[clash.elementType] = (stats.byElement[clash.elementType] || 0) + 1;
      stats.byDiscipline[clash.discipline] = (stats.byDiscipline[clash.discipline] || 0) + 1;
      stats.bySeverity[clash.severity] = (stats.bySeverity[clash.severity] || 0) + 1;
      stats.byLevel[clash.level] = (stats.byLevel[clash.level] || 0) + 1;
      stats.byGroup[clash.clashGroup] = (stats.byGroup[clash.clashGroup] || 0) + 1;
    });

    // Calculate resolution rate
    const resolvedClashes = clashes.filter(c => c.status === 'resolved').length;
    stats.resolutionRate = (resolvedClashes / clashes.length) * 100;

    // Count critical issues
    stats.criticalIssues = clashes.filter(c => c.severity === 'high').length;

    // Calculate average clashes per level
    const levels = Object.keys(stats.byLevel).length;
    stats.averageClashesPerLevel = clashes.length / (levels || 1);

    // Get top locations
    stats.topLocations = Object.entries(stats.byLocation)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate discipline breakdown with resolution rates
    stats.disciplineBreakdown = Object.entries(stats.byDiscipline).map(([discipline, count]) => ({
      discipline,
      count,
      resolved: clashes.filter(c => c.discipline === discipline && c.status === 'resolved').length
    }));

    return stats;
  };

  const parseLocationInfo = (location: string) => {
    const levelMatch = location.match(/(?:level|lvl\.?|floor)\s*(\d+)/i);
    const level = levelMatch ? `Level ${levelMatch[1]}` : 'Unspecified Level';

    let cleanLocation = location
      .replace(/(?:level|lvl\.?|floor)\s*\d+/i, '')
      .trim()
      .replace(/^[,-\s]+|[,-\s]+$/g, '');

    if (!cleanLocation) {
      cleanLocation = level;
    }

    return {
      level,
      location: cleanLocation
    };
  };

  const determineDiscipline = (clash: any, elements: any[]): 'MECH' | 'PL' | 'EL' | 'FP' => {
    const type = clash['@_type']?.toLowerCase() || '';
    const elementTypes = elements.map(e => e.type.toLowerCase()).join(' ');
    
    if (type.includes('mech') || elementTypes.includes('duct') || elementTypes.includes('pipe')) return 'MECH';
    if (type.includes('plumb') || elementTypes.includes('plumbing')) return 'PL';
    if (type.includes('elec') || elementTypes.includes('conduit') || elementTypes.includes('cable')) return 'EL';
    if (type.includes('fire') || elementTypes.includes('sprinkler')) return 'FP';
    
    if (elementTypes.includes('hvac')) return 'MECH';
    if (elementTypes.includes('electrical')) return 'EL';
    if (elementTypes.includes('water') || elementTypes.includes('sanitary')) return 'PL';
    
    return 'MECH';
  };

  const determineSeverity = (clash: any): 'high' | 'medium' | 'low' => {
    const priority = clash['@_priority']?.toLowerCase() || '';
    const status = clash['@_status']?.toLowerCase() || '';
    const description = clash.description?.toLowerCase() || '';
    
    const criticalTerms = ['critical', 'severe', 'major', 'urgent', 'safety'];
    const mediumTerms = ['moderate', 'medium', 'minor'];
    
    if (priority.includes('high') || criticalTerms.some(term => description.includes(term))) {
      return 'high';
    }
    if (priority.includes('medium') || mediumTerms.some(term => description.includes(term))) {
      return 'medium';
    }
    if (status === 'approved' || status === 'resolved') {
      return 'low';
    }
    
    return 'medium';
  };

  const determineClashGroup = (location: string): string => {
    const location_lower = location.toLowerCase();
    if (location_lower.includes('hallway') || location_lower.includes('corridor')) return 'Hallway Clashes';
    if (location_lower.includes('shaft') || location_lower.includes('riser')) return 'Riser Shaft';
    if (location_lower.includes('mechanical') || location_lower.includes('equipment')) return 'Mechanical Room';
    if (location_lower.includes('office') || location_lower.includes('workspace')) return 'Office Area';
    return 'General Area';
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
        const clashes = parseClashesToTasks(result);
        setXmlData(result);
        const stats = calculateClashStats(clashes);
        setClashStats(stats);
        setError(null);
        onXmlDataParsed(result, clashes);
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

  const clearFile = () => {
    setXmlData(null);
    setFileName(null);
    setError(null);
    setClashStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
            {renderChart(clashStats.byDiscipline, 'Clashes by Discipline')}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            {renderChart(clashStats.bySeverity, 'Clashes by Severity')}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            {renderChart(clashStats.byStatus, 'Clashes by Status')}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            {renderChart(clashStats.byGroup, 'Clashes by Group')}
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-700 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Resolution Rate</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {clashStats.resolutionRate.toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-700 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Critical Issues</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {clashStats.criticalIssues}
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-700 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Clashes/Level</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {clashStats.averageClashesPerLevel.toFixed(1)}
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-700 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Total Clashes</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {clashStats.total}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">XML Model Data</h2>
            <div className="flex items-center gap-4">
              {fileName && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {fileName}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                    aria-label="Remove file"
                  >
                    <X size={14} className="text-slate-500 dark:text-slate-400" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xml"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="xml-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={triggerFileUpload}
                  leftIcon={<Upload size={16} />}
                >
                  {xmlData ? 'Change File' : 'Upload XML'}
                </Button>
              </div>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
        </CardHeader>
        {isExpanded && (
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
                    <pre className="text-sm text-slate-600 dark:text-slate-400">
                      {JSON.stringify(xmlData, null, 2)}
                    </pre>
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
        )}
      </Card>

      {xmlData && <ClashAnalysis xmlData={xmlData} />}
    </div>
  );
};

export default XmlViewer;