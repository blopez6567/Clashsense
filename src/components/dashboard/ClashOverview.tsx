import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { AlertOctagon, AlertTriangle, AlertCircle } from 'lucide-react';

const ClashOverview: React.FC = () => {
  const clashCategories = [
    {
      severity: 'Critical',
      count: 24,
      description: 'Major structural conflicts',
      icon: <AlertOctagon className="text-red-500" size={20} />,
      color: 'bg-red-500',
    },
    {
      severity: 'Major',
      count: 67,
      description: 'System interference issues',
      icon: <AlertTriangle className="text-amber-500" size={20} />,
      color: 'bg-amber-500',
    },
    {
      severity: 'Minor',
      count: 65,
      description: 'Minor clearance issues',
      icon: <AlertCircle className="text-blue-500" size={20} />,
      color: 'bg-blue-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Clash Overview</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {clashCategories.map((category) => (
            <div key={category.severity} className="flex items-center">
              <div className="flex-shrink-0">{category.icon}</div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {category.severity}
                  </span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {category.count}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full`}
                    style={{ width: `${(category.count / 156) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Most Affected Areas</h3>
          <div className="space-y-2">
            {[
              { area: 'Mechanical Room - Level 2', clashes: 45 },
              { area: 'Main Corridor - Level 1', clashes: 38 },
              { area: 'Operating Theaters', clashes: 31 },
            ].map((item) => (
              <div
                key={item.area}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.area}</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {item.clashes} clashes
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClashOverview;