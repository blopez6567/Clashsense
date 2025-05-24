import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, AlertTriangle, AlertOctagon, AlertCircle } from 'lucide-react';

interface DisciplineProgress {
  code: string;
  name: string;
  total: number;
  resolved: number;
  icon: React.ReactNode;
  color: string;
}

const ClashProgressTracker: React.FC = () => {
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

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Resolution Progress</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {disciplines.map((discipline) => {
            const percentage = Math.round((discipline.resolved / discipline.total) * 100);
            const remaining = discipline.total - discipline.resolved;
            
            return (
              <div key={discipline.code} className="space-y-2">
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
                    {remaining > 0 && (
                      <span className="text-slate-500 dark:text-slate-400">
                        {remaining} remaining
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClashProgressTracker;