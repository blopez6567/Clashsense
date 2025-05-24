import React, { useState } from 'react';
import { Building2, Users2, FileCheck2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';

interface ModelStats {
  total: number;
  updated: number;
  reviewing: number;
}

interface ModelSummaryProps {
  stats: ModelStats;
}

const ModelSummary: React.FC<ModelSummaryProps> = ({ stats }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const summaryStats = [
    {
      name: 'Total Models',
      value: stats.total.toString(),
      change: `${stats.updated} updated`,
      icon: <Building2 size={24} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Team Members',
      value: '28',
      change: `${stats.reviewing} reviewing`,
      icon: <Users2 size={24} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Resolved Issues',
      value: '342',
      change: '89% resolution rate',
      icon: <FileCheck2 size={24} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Open Clashes',
      value: '156',
      change: '24 critical',
      icon: <AlertTriangle size={24} className="text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Model Summary</h2>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryStats.map((stat) => (
              <div key={stat.name} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    {stat.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{stat.change}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ModelSummary;