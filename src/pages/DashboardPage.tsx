import React, { useState } from 'react';
import ModelSummary from '../components/dashboard/ModelSummary';
import ClashOverview from '../components/dashboard/ClashOverview';
import CoordinationGoals from '../components/dashboard/CoordinationGoals';
import RecentUpdates from '../components/dashboard/RecentUpdates';
import XmlViewer from '../components/dashboard/XmlViewer';
import ClashTodoList from '../components/dashboard/ClashTodoList';
import ClashProgressTracker from '../components/dashboard/ClashProgressTracker';
import ProjectSelector, { ProjectData } from '../components/dashboard/ProjectSelector';

const DashboardPage: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);

  // Update document title when component mounts
  React.useEffect(() => {
    document.title = 'Dashboard | ClashSense';
  }, []);

  const handleProjectChange = (project: ProjectData) => {
    setCurrentProject(project);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ProjectSelector onProjectChange={handleProjectChange} />
        </div>

        {currentProject && (
          <div className="grid grid-cols-1 gap-6">
            <ModelSummary stats={currentProject.modelStats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ClashOverview stats={currentProject.clashStats} />
              </div>
              <div className="lg:col-span-1">
                <CoordinationGoals project={currentProject} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ClashTodoList project={currentProject} />
              </div>
              <div className="lg:col-span-1">
                <ClashProgressTracker progress={currentProject.disciplineProgress} />
              </div>
            </div>
            
            <XmlViewer />
            
            <RecentUpdates project={currentProject} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;