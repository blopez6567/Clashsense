import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { Home, Plane, GraduationCap } from 'lucide-react';

interface GoalProps {
  title: string;
  icon: React.ReactNode;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  color: string;
}

const Goal: React.FC<GoalProps> = ({ title, icon, currentAmount, targetAmount, deadline, color }) => {
  const progress = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const remainingDays = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{remainingDays} days left</p>
          </div>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
          {progress}%
        </span>
      </div>
      
      <div className="mt-4">
        <div className="relative">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>${currentAmount.toLocaleString()}</span>
            <span>${targetAmount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SavingGoals: React.FC = () => {
  const goals = [
    {
      id: 1,
      title: 'Down Payment',
      icon: <Home size={16} className="text-white" />,
      currentAmount: 25000,
      targetAmount: 60000,
      deadline: '2024-12-31',
      color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/50',
    },
    {
      id: 2,
      title: 'Vacation',
      icon: <Plane size={16} className="text-white" />,
      currentAmount: 2800,
      targetAmount: 4000,
      deadline: '2024-06-15',
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/50',
    },
    {
      id: 3,
      title: 'Education',
      icon: <GraduationCap size={16} className="text-white" />,
      currentAmount: 12000,
      targetAmount: 30000,
      deadline: '2025-08-31',
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/50',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Savings Goals</h2>
        <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
          Add New Goal
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <Goal key={goal.id} {...goal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingGoals;