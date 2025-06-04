import React, { useState } from 'react';
import ModelSummary from '../components/dashboard/ModelSummary';
import ClashOverview from '../components/dashboard/ClashOverview';
import CoordinationGoals from '../components/dashboard/CoordinationGoals';
import RecentUpdates from '../components/dashboard/RecentUpdates';
import XmlViewer from '../components/dashboard/XmlViewer';
import ClashTodoList from '../components/dashboard/ClashTodoList';
import ClashProgressTracker from '../components/dashboard/ClashProgressTracker';
import ClashImageParser from '../components/dashboard/ClashImageParser';
import BcfExporter from '../components/dashboard/BcfExporter';
import ProjectSelector from '../components/dashboard/ProjectSelector';
import Button from '../components/ui/Button';
import { LayoutGrid, Layers } from 'lucide-react';
import { ProjectData, ClashTask } from '../types';

const DashboardPage: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('advanced');
  const [parsedXmlClashes, setParsedXmlClashes] = useState<ClashTask[]>([]);

  const handleProjectChange = (project: ProjectData) => {
    setCurrentProject(project);
    // Reset parsed XML data when switching projects
    setParsedXmlClashes([]);
  };

  const handleXmlDataParsed = (xmlData: any, clashes: ClashTask[]) => {
    setParsedXmlClashes(clashes);
    
    if (currentProject) {
      // Update clash statistics based on parsed data
      const updatedProject = {
        ...currentProject,
        clashStats: {
          total: clashes.length,
          critical: clashes.filter(c => c.severity === 'high').length,
          major: clashes.filter(c => c.severity === 'medium').length,
          minor: clashes.filter(c => c.severity === 'low').length,
          resolved: clashes.filter(c => c.status === 'resolved').length
        },
        disciplineProgress: {
          MECH: calculateDisciplineProgress(clashes, 'MECH'),
          PL: calculateDisciplineProgress(clashes, 'PL'),
          EL: calculateDisciplineProgress(clashes, 'EL'),
          FP: calculateDisciplineProgress(clashes, 'FP')
        },
        clashes
      };
      setCurrentProject(updatedProject);
    }
  };

  const calculateDisciplineProgress = (clashes: ClashTask[], discipline: string) => {
    const disciplineClashes = clashes.filter(c => c.discipline === discipline);
    return {
      total: disciplineClashes.length,
      resolved: disciplineClashes.filter(c => c.status === 'resolved').length
    };
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Dashboard</h2>
          <div className="view-toggle flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <Button
              size="sm"
              variant={viewMode === 'simple' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('simple')}
              leftIcon={<LayoutGrid size={16} />}
            >
              Simple
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'advanced' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('advanced')}
              leftIcon={<Layers size={16} />}
            >
              Advanced
            </Button>
          </div>
        </div>

        <div className="project-selector mb-8">
          <ProjectSelector onProjectChange={handleProjectChange} />
        </div>

        {currentProject && (
          <div className="grid grid-cols-1 gap-6">
            {viewMode === 'advanced' ? (
              <>
                <div className="model-summary">
                  <ModelSummary stats={currentProject.modelStats} />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 clash-overview">
                    <ClashOverview stats={currentProject.clashStats} />
                  </div>
                  <div className="lg:col-span-1 coordination-goals">
                    <CoordinationGoals project={currentProject} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 clash-todo">
                    <ClashTodoList clashes={parsedXmlClashes.length > 0 ? parsedXmlClashes : currentProject.clashes || []} />
                  </div>
                  <div className="lg:col-span-1 clash-progress">
                    <ClashProgressTracker progress={currentProject.disciplineProgress} />
                  </div>
                </div>
                
                <div className="quick-clash-analysis">
                  <ClashImageParser />
                </div>
                
                <div className="xml-viewer">
                  <XmlViewer onXmlDataParsed={handleXmlDataParsed} />
                </div>

                <div className="bcf-exporter">
                  <BcfExporter 
                    clashes={parsedXmlClashes.length > 0 ? parsedXmlClashes : currentProject.clashes || []} 
                    projectName={currentProject.name}
                  />
                </div>
                
                <div className="recent-updates">
                  <RecentUpdates project={currentProject} />
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="quick-clash-analysis">
                  <ClashImageParser />
                </div>
                <div className="xml-viewer">
                  <XmlViewer onXmlDataParsed={handleXmlDataParsed} />
                </div>
                <div className="clash-todo">
                  <ClashTodoList clashes={parsedXmlClashes.length > 0 ? parsedXmlClashes : currentProject.clashes || []} />
                </div>
                <div className="bcf-exporter">
                  <BcfExporter 
                    clashes={parsedXmlClashes.length > 0 ? parsedXmlClashes : currentProject.clashes || []} 
                    projectName={currentProject.name}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;