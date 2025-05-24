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
          examples: [
            'Steel beam intersecting with main HVAC duct on Level 3',
            'Column clashing with primary electrical conduit in utility room',
            'Foundation conflicts with underground plumbing lines',
            'Load-bearing wall interference with mechanical equipment'
          ]
        },
        {
          type: 'Major Service Clashes',
          count: 8,
          examples: [
            'Main electrical busway conflicting with fire suppression main',
            'Primary chilled water line intersection with structural bracing',
            'Emergency generator exhaust routing through occupied space',
            'Critical mechanical equipment clearance violations'
          ]
        },
        {
          type: 'Emergency System Conflicts',
          count: 4,
          examples: [
            'Fire sprinkler main blocked by structural elements',
            'Emergency exit pathway obstructed by mechanical equipment',
            'Smoke evacuation duct conflicts with structural beams',
            'Emergency lighting conduit clashing with HVAC ductwork'
          ]
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
          examples: [
            'Supply and return duct interference in ceiling space',
            'Multiple pipe crossings in congested areas',
            'Cable tray routing conflicts with mechanical systems',
            'Ductwork clashing with sprinkler branch lines'
          ]
        },
        {
          type: 'Equipment Access Issues',
          count: 22,
          examples: [
            'Insufficient clearance for AHU maintenance',
            'Electrical panel access space violations',
            'Valve access blocked by other services',
            'Equipment removal pathway obstructions'
          ]
        },
        {
          type: 'Installation Sequence Conflicts',
          count: 17,
          examples: [
            'Overlapping installation space requirements',
            'Service access conflicts between trades',
            'Complex system intersections requiring coordination',
            'Installation clearance issues in tight spaces'
          ]
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
          examples: [
            'Pipe insulation overlap in non-critical areas',
            'Duct insulation clearance issues',
            'Minor thermal barrier conflicts',
            'Insulation compression points'
          ]
        },
        {
          type: 'Non-critical Spacing',
          count: 20,
          examples: [
            'Minor pipe spacing violations',
            'Non-essential equipment clearance issues',
            'Secondary system routing conflicts',
            'Maintenance access optimization needed'
          ]
        },
        {
          type: 'Aesthetic Conflicts',
          count: 15,
          examples: [
            'Ceiling grid alignment issues',
            'Visible service coordination in public spaces',
            'Fixture alignment discrepancies',
            'Non-structural finish conflicts'
          ]
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
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                            {detail.type}
                          </h4>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {detail.count} issues
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {detail.examples.map((example, i) => (
                          <div key={i} className="flex items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2 mr-2 flex-shrink-0"></span>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{example}</p>
                          </div>
                        ))}
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