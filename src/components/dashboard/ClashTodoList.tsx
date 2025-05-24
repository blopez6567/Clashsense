import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, AlertCircle, Filter, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface ClashTask {
  id: string;
  description: string;
  discipline: 'MECH' | 'PL' | 'EL' | 'FP';
  severity: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'resolved';
  location: string;
}

const ClashTodoList: React.FC = () => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedDiscipline, setExpandedDiscipline] = useState<string | null>(null);

  const disciplines = [
    { code: 'MECH', name: 'Mechanical' },
    { code: 'PL', name: 'Plumbing' },
    { code: 'EL', name: 'Electrical' },
    { code: 'FP', name: 'Fire Protection' }
  ];

  // Simulated larger dataset
  const allTasks: ClashTask[] = [
    {
      id: '1',
      description: 'Ductwork interference with structural beam on Level 3',
      discipline: 'MECH',
      severity: 'high',
      status: 'pending',
      location: 'Level 3 - Grid A-5'
    },
    {
      id: '2',
      description: 'Sprinkler main conflicts with electrical conduit rack',
      discipline: 'FP',
      severity: 'high',
      status: 'in-progress',
      location: 'Level 2 - Corridor'
    },
    {
      id: '3',
      description: 'Sanitary line clash with supply duct',
      discipline: 'PL',
      severity: 'medium',
      status: 'pending',
      location: 'Level 1 - Kitchen Area'
    },
    {
      id: '4',
      description: 'Cable tray intersection with mechanical piping',
      discipline: 'EL',
      severity: 'medium',
      status: 'pending',
      location: 'Basement - Utility Room'
    },
    // Additional tasks per discipline
    {
      id: '5',
      description: 'Return air duct clash with fire sprinkler main',
      discipline: 'MECH',
      severity: 'high',
      status: 'pending',
      location: 'Level 4 - Office Area'
    },
    {
      id: '6',
      description: 'Supply duct interference with lighting fixtures',
      discipline: 'MECH',
      severity: 'medium',
      status: 'in-progress',
      location: 'Level 2 - Open Office'
    },
    {
      id: '7',
      description: 'Waste stack conflict with structural column',
      discipline: 'PL',
      severity: 'high',
      status: 'pending',
      location: 'Level 3 - Restrooms'
    },
    {
      id: '8',
      description: 'Hot water line clash with return air duct',
      discipline: 'PL',
      severity: 'medium',
      status: 'in-progress',
      location: 'Level 1 - Mechanical Room'
    },
    {
      id: '9',
      description: 'Main switchgear clearance violation',
      discipline: 'EL',
      severity: 'high',
      status: 'pending',
      location: 'Basement - Electrical Room'
    },
    {
      id: '10',
      description: 'Emergency lighting conduit clash with ductwork',
      discipline: 'EL',
      severity: 'medium',
      status: 'in-progress',
      location: 'Level 2 - Corridor'
    },
    {
      id: '11',
      description: 'Sprinkler branch line conflict with cable tray',
      discipline: 'FP',
      severity: 'medium',
      status: 'pending',
      location: 'Level 3 - IT Room'
    },
    {
      id: '12',
      description: 'Fire main routing clash with structural beam',
      discipline: 'FP',
      severity: 'high',
      status: 'in-progress',
      location: 'Level 1 - Main Corridor'
    }
  ];

  const toggleDiscipline = (discipline: string) => {
    if (expandedDiscipline === discipline) {
      setExpandedDiscipline(null);
    } else {
      setExpandedDiscipline(discipline);
      setSelectedDisciplines([discipline]);
    }
  };

  const filteredTasks = allTasks.filter(task =>
    expandedDiscipline 
      ? task.discipline === expandedDiscipline
      : selectedDisciplines.length === 0 || selectedDisciplines.includes(task.discipline)
  );

  // Show only 4 tasks in preview mode
  const displayedTasks = expandedDiscipline ? filteredTasks : filteredTasks.slice(0, 4);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'medium':
        return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      case 'low':
        return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30';
      default:
        return 'text-slate-500 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  const getDisciplineTaskCount = (discipline: string) => {
    return allTasks.filter(task => task.discipline === discipline).length;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {expandedDiscipline 
              ? `${disciplines.find(d => d.code === expandedDiscipline)?.name} Clashes`
              : 'Clash Resolution Tasks'
            }
          </h2>
          <div className="flex items-center gap-2">
            {expandedDiscipline && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedDiscipline(null)}
              >
                Back to Overview
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter size={16} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter by Discipline
            </Button>
          </div>
        </div>
        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {disciplines.map(discipline => (
              <button
                key={discipline.code}
                onClick={() => toggleDiscipline(discipline.code)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center ${
                  expandedDiscipline === discipline.code
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {discipline.code}
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-slate-200 dark:bg-slate-700">
                  {getDisciplineTaskCount(discipline.code)}
                </span>
              </button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedTasks.map(task => (
            <div
              key={task.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(task.severity)}`}>
                      {task.severity.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {task.discipline}
                    </span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-medium">
                    {task.description}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {task.location}
                  </p>
                </div>
                <div className="ml-4">
                  {task.status === 'resolved' ? (
                    <CheckCircle2 className="text-emerald-500" size={20} />
                  ) : (
                    <AlertCircle className="text-amber-500" size={20} />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {!expandedDiscipline && filteredTasks.length > 4 && (
            <div className="text-center pt-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing 4 of {filteredTasks.length} tasks. Select a discipline to view all.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClashTodoList;