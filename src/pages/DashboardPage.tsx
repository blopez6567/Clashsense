import React, { useState, useEffect } from 'react';
import ModelSummary from '../components/dashboard/ModelSummary';
import ClashOverview from '../components/dashboard/ClashOverview';
import CoordinationGoals from '../components/dashboard/CoordinationGoals';
import RecentUpdates from '../components/dashboard/RecentUpdates';
import XmlViewer from '../components/dashboard/XmlViewer';
import ClashTodoList from '../components/dashboard/ClashTodoList';
import ClashProgressTracker from '../components/dashboard/ClashProgressTracker';
import ClashImageParser from '../components/dashboard/ClashImageParser';
import DashboardTour from '../components/dashboard/DashboardTour';
import ProjectSelector, { ProjectData } from '../components/dashboard/ProjectSelector';
import Button from '../components/ui/Button';
import { LayoutGrid, Layers } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('advanced');
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard | ClashSense';
    const tourCompleted = localStorage.getItem('dashboardTourCompleted');
    setIsFirstVisit(!tourCompleted);
  }, []);

  const handleProjectChange = (project: ProjectData) => {
    setCurrentProject(project);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-8 pb-12">
      <DashboardTour isFirstVisit={isFirstVisit} />
      
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
                    <ClashTodoList project={currentProject} />
                  </div>
                  <div className="lg:col-span-1 clash-progress">
                    <ClashProgressTracker progress={currentProject.disciplineProgress} />
                  </div>
                </div>
                
                <div className="quick-clash-analysis">
                  <ClashImageParser />
                </div>
                
                <div className="xml-viewer">
                  <XmlViewer />
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
                  <XmlViewer />
                </div>
                <div className="clash-todo">
                  <ClashTodoList project={currentProject} />
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