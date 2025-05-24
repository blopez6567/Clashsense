import React from 'react';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { GitMerge, RefreshCw, FileCheck, BarChart3, ArrowDownToLine, Activity } from 'lucide-react';

const IntegrationsPage: React.FC = () => {
  const features = [
    {
      title: 'Model Syncing',
      description: 'Automatically pulls data from Revit/Navisworks models to the AI tool.',
      icon: <GitMerge className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Clash Report Viewer',
      description: 'Displays detected clashes with details like location, severity, and involved elements.',
      icon: <Activity className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Smart Rerouting Suggestions',
      description: 'Shows AI-generated rerouting options to resolve the clash with minimal impact.',
      icon: <RefreshCw className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Approval/Editing Interface',
      description: 'Lets users accept suggestions, manually adjust solutions, or send feedback.',
      icon: <FileCheck className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Change Pushback',
      description: 'Applies the approved rerouting changes back to the BIM model via plugins or APIs.',
      icon: <ArrowDownToLine className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Analytics Dashboard',
      description: 'Tracks resolution rates, model health, and clash trends over time.',
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Integrations</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Seamlessly integrate with Revit and Navisworks Manage for comprehensive BIM clash detection and resolution.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;