import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { AlertOctagon, AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ClashOverview: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const clashCategories = [
    {
      severity: 'Critical',
      count: 24,
      description: 'Major structural conflicts',
      icon: <AlertOctagon className="text-red-500" size={20} />,
      color: 'bg-red-500',
      details: [
        {
          type: 'Structural-MEP Interference',
          count: 12,
          examples: 'Beam-ductwork conflicts, Column-pipe intersections'
        },
        {
          type: 'Major Service Clashes',
          count: 8,
          examples: 'Main duct-electrical busway conflicts, Primary structure-equipment clearance'
        },
        {
          type: 'Emergency System Conflicts',
          count: 4,
          examples: 'Fire suppression system obstructions, Emergency exit pathway conflicts'
        }
      ]
    },
    {
      severity: 'Major',
      count: 67,
      description: 'System interference issues',
      icon: <AlertTriangle className="text-amber-500" size={20} />,
      color: 'bg-amber-500',
      details: [
        {
          type: 'MEP System Conflicts',
          count: 28,
          examples: 'Duct-pipe intersections, Cable tray-ductwork conflicts'
        },
        {
          type: 'Equipment Access Issues',
          count: 22,
          examples: 'Maintenance clearance violations, Access panel obstructions'
        },
        {
          type: 'Installation Sequence Conflicts',
          count: 17,
          examples: 'Installation space constraints, Service access conflicts'
        }
      ]
    },
    {
      severity: 'Minor',
      count: 65,
      description: 'Minor clearance issues',
      icon: <AlertCircle className="text-blue-500" size={20} />,
      color: 'bg-blue-500',
      details: [
        {
          type: 'Insulation Clearance',
          count: 30,
          examples: 'Pipe insulation overlaps, Duct insulation clearances'
        },
        {
          type: 'Non-critical Spacing',
          count: 20,
          examples: 'Minor pipe spacing issues, Non-essential clearance violations'
        },
        {
          type: 'Aesthetic Conflicts',
          count: 15,
          examples: 'Ceiling grid alignment, Visual coordination issues'
        }
      ]
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
            <div key={category.severity}>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setExpandedCategory(expandedCategory === category.severity ? null : category.severity)}
              >
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
                <div className="ml-4">
                  {expandedCategory === category.severity ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>

              {expandedCategory === category.severity && (
                <div className="mt-4 ml-9 space-y-4">
                  {category.details.map((detail, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                            {detail.type}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {detail.examples}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {detail.count} issues
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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