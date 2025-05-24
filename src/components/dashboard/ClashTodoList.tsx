import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, AlertCircle, Filter } from 'lucide-react';
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

  const disciplines = [
    { code: 'MECH', name: 'Mechanical' },
    { code: 'PL', name: 'Plumbing' },
    { code: 'EL', name: 'Electrical' },
    { code: 'FP', name: 'Fire Protection' }
  ];

  const tasks: ClashTask[] = [
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
    }
  ];

  const toggleDiscipline = (discipline: string) => {
    setSelectedDisciplines(prev =>
      prev.includes(discipline)
        ? prev.filter(d => d !== discipline)
        : [...prev, discipline]
    );
  };

  const filteredTasks = tasks.filter(task =>
    selectedDisciplines.length === 0 || selectedDisciplines.includes(task.discipline)
  );

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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Clash Resolution Tasks</h2>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Filter size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter by Discipline
          </Button>
        </div>
        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {disciplines.map(discipline => (
              <button
                key={discipline.code}
                onClick={() => toggleDiscipline(discipline.code)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  selectedDisciplines.includes(discipline.code)
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {discipline.code}
              </button>
            ))}
            {selectedDisciplines.length > 0 && (
              <button
                onClick={() => setSelectedDisciplines([])}
                className="px-3 py-1.5 text-sm font-medium rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTasks.map(task => (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ClashTodoList;