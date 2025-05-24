import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, AlertTriangle, AlertOctagon, AlertCircle, BarChart4, PieChart } from 'lucide-react';
import Button from '../ui/Button';

interface DisciplineProgress {
  code: string;
  name: string;
  total: number;
  resolved: number;
  icon: React.ReactNode;
  color: string;
}

const ClashProgressTracker: React.FC = () => {
  const [viewMode, setViewMode] = useState<'overall' | 'specific'>('overall');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);

  const disciplines: DisciplineProgress[] = [
    {
      code: 'MECH',
      name: 'Mechanical',
      total: 45,
      resolved: 32,
      icon: <AlertOctagon size={20} />,
      color: 'text-blue-500'
    },
    {
      code: 'PL',
      name: 'Plumbing',
      total: 38,
      resolved: 25,
      icon: <AlertTriangle size={20} />,
      color: 'text-emerald-500'
    },
    {
      code: 'EL',
      name: 'Electrical',
      total: 52,
      resolved: 41,
      icon: <AlertCircle size={20} />,
      color: 'text-amber-500'
    },
    {
      code: 'FP',
      name: 'Fire Protection',
      total: 21,
      resolved: 18,
      icon: <CheckCircle2 size={20} />,
      color: 'text-red-500'
    }
  ];

  const totalClashes = disciplines.reduce((sum, d) => sum + d.total, 0);
  const totalResolved = disciplines.reduce((sum, d) => sum + d.resolved, 0);
  const overallPercentage = Math.round((totalResolved / totalClashes) * 100);

  const renderProgressBar = (resolved: number, total: number, showDetails = true) => {
    const percentage = Math.round((resolved / total) * 100);
    const remaining = total - resolved;
    
    return (
      <div className="space-y-2">
        <div className="relative">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-in-out ${
                percentage >= 90 
                  ? 'bg-emerald-500' 
                  : percentage >= 60 
                  ? 'bg-blue-500'
                  : percentage >= 30
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs">
            <span className={`font-medium ${
              percentage >= 90 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : percentage >= 60 
                ? 'text-blue-600 dark:text-blue-400'
                : percentage >= 30
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {percentage}% Complete
            </span>
            {showDetails && remaining > 0 && (
              <span className="text-slate-500 dark:text-slate-400">
                {remaining} remaining
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Resolution Progress</h2>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={viewMode === 'overall' ? 'primary' : 'outline'}
              leftIcon={<BarChart4 size={16} />}
              onClick={() => {
                setViewMode('overall');
                setSelectedDiscipline(null);
              }}
            >
              Overall
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'specific' ? 'primary' : 'outline'}
              leftIcon={<PieChart size={16} />}
              onClick={() => setViewMode('specific')}
            >
              By Discipline
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'overall' ? (
          <div className="space-y-6">
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {overallPercentage}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Overall Resolution Rate
              </div>
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {totalResolved} of {totalClashes} clashes resolved
              </div>
            </div>
            {renderProgressBar(totalResolved, totalClashes, false)}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {disciplines.map((discipline) => (
                <div 
                  key={discipline.code}
                  className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={discipline.color}>{discipline.icon}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {discipline.name}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {Math.round((discipline.resolved / discipline.total) * 100)}% Complete
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {disciplines.map((discipline) => (
              <div 
                key={discipline.code}
                className={`p-4 rounded-lg transition-colors ${
                  selectedDiscipline === discipline.code
                    ? 'bg-slate-100 dark:bg-slate-800'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer'
                }`}
                onClick={() => setSelectedDiscipline(
                  selectedDiscipline === discipline.code ? null : discipline.code
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={discipline.color}>{discipline.icon}</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {discipline.name}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {discipline.resolved} of {discipline.total} resolved
                  </div>
                </div>
                {renderProgressBar(discipline.resolved, discipline.total)}
                
                {selectedDiscipline === discipline.code && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-slate-700 rounded-lg">
                      <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                        Resolution Rate
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {Math.round((discipline.resolved / discipline.total) * 100)}%
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-700 rounded-lg">
                      <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                        Remaining
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {discipline.total - discipline.resolved}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClashProgressTracker;