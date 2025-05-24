import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, Clock } from 'lucide-react';

const CoordinationGoals: React.FC = () => {
  const goals = [
    {
      name: 'MEP Coordination',
      deadline: '2024-03-15',
      progress: 75,
      status: 'On Track',
    },
    {
      name: 'Structural Review',
      deadline: '2024-03-20',
      progress: 60,
      status: 'At Risk',
    },
    {
      name: 'Architecture Sign-off',
      deadline: '2024-03-25',
      progress: 40,
      status: 'On Track',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Coordination Goals</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-900 dark:text-white">{goal.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  goal.status === 'On Track' 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                }`}>
                  {goal.status}
                </span>
              </div>
              
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{goal.progress}% Complete</span>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {[
              'Foundation clash resolution complete',
              'HVAC routing optimization approved',
              'Electrical systems review completed',
            ].map((achievement, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle2 size={16} className="text-emerald-500 mr-2" />
                <span className="text-slate-600 dark:text-slate-400">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoordinationGoals;