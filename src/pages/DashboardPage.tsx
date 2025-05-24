import React from 'react';
import Layout from '../components/layout/Layout';
import ClashOverview from '../components/dashboard/ClashOverview';
import ProjectSelector from '../components/dashboard/ProjectSelector';
import ClashAnalysis from '../components/dashboard/ClashAnalysis';
import RecentUpdates from '../components/dashboard/RecentUpdates';
import ClashTodoList from '../components/dashboard/ClashTodoList';
import ClashProgressTracker from '../components/dashboard/ClashProgressTracker';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <ProjectSelector />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ClashOverview />
          <ClashAnalysis />
          <RecentUpdates />
          <ClashTodoList />
          <ClashProgressTracker />
        </div>
      </div>
    </Layout>
  );
}