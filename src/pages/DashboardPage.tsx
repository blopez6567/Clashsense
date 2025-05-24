import React from 'react';
import ModelSummary from '../components/dashboard/ModelSummary';
import ClashOverview from '../components/dashboard/ClashOverview';
import CoordinationGoals from '../components/dashboard/CoordinationGoals';
import RecentUpdates from '../components/dashboard/RecentUpdates';
import XmlViewer from '../components/dashboard/XmlViewer';
import ClashTodoList from '../components/dashboard/ClashTodoList';
import ClashProgressTracker from '../components/dashboard/ClashProgressTracker';

const DashboardPage: React.FC = () => {
  // Update document title when component mounts
  React.useEffect(() => {
    document.title = 'Dashboard | ClashSense';
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Project Overview</h1>
            <p className="text-slate-500 dark:text-slate-400">Hospital Wing Extension - Phase 2</p>
          </div>
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Active Project
            </span>
          </div>
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