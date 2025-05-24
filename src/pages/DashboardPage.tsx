import React from 'react';
import ModelSummary from '../components/dashboard/ModelSummary';
import ClashOverview from '../components/dashboard/ClashOverview';
import CoordinationGoals from '../components/dashboard/CoordinationGoals';
import RecentUpdates from '../components/dashboard/RecentUpdates';
import XmlViewer from '../components/dashboard/XmlViewer';
import ClashTodoList from '../components/dashboard/ClashTodoList';
import ClashProgressTracker from '../components/dashboard/ClashProgressTracker';
import ProjectSelector from '../components/dashboard/ProjectSelector';

const DashboardPage: React.FC = () => {
  // Update document title when component mounts
  React.useEffect(() => {
    document.title = 'Dashboard | ClashSense';
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ProjectSelector />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ModelSummary />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ClashOverview />
            </div>
            <div className="lg:col-span-1">
              <CoordinationGoals />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ClashTodoList />
            </div>
            <div className="lg:col-span-1">
              <ClashProgressTracker />
            </div>
          </div>
          
          <XmlViewer />
          
          <RecentUpdates />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;