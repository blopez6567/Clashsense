import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { FileEdit, GitMerge, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const RecentUpdates: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const updates = [
    {
      id: 1,
      type: 'modification',
      model: 'Mechanical System',
      user: 'Alex Chen',
      action: 'Updated ductwork routing in Level 2',
      timestamp: '2 hours ago',
      icon: <FileEdit size={16} className="text-blue-500" />,
    },
    {
      id: 2,
      type: 'merge',
      model: 'Structural Model',
      user: 'Sarah Johnson',
      action: 'Merged updated column locations',
      timestamp: '4 hours ago',
      icon: <GitMerge size={16} className="text-purple-500" />,
    },
    {
      id: 3,
      type: 'issue',
      model: 'Electrical System',
      user: 'Mike Wilson',
      action: 'Reported new clash in service shaft',
      timestamp: '5 hours ago',
      icon: <AlertCircle size={16} className="text-amber-500" />,
    },
    {
      id: 4,
      type: 'resolution',
      model: 'Plumbing System',
      user: 'Emma Davis',
      action: 'Resolved pipe interference issue',
      timestamp: '6 hours ago',
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Model Updates</h2>
          <div className="flex items-center">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mr-4">
              View all
            </button>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {updates.map((update, updateIdx) => (
                <li key={update.id}>
                  <div className="relative pb-8">
                    {updateIdx !== updates.length - 1 ? (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ring-8 ring-white dark:ring-slate-900">
                          {update.icon}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-slate-900 dark:text-white">
                              {update.user}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                            {update.action}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            <span>{update.model}</span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {update.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentUpdates;