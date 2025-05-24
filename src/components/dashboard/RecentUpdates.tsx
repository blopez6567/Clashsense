import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { FileEdit, GitMerge, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Filter, Calendar, Users2, X } from 'lucide-react';
import Button from '../ui/Button';

// ... (previous interface definitions)

const RecentUpdates: React.FC = () => {
  // ... (previous state definitions)

  const groupUpdatesByDate = (updates: Update[]) => {
    const groups: { [key: string]: Update[] } = {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: []
    };

    updates.forEach(update => {
      const updateDate = new Date(update.timestamp);
      const timeDiff = currentDate.getTime() - updateDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        groups.today.push(update);
      } else if (daysDiff === 1) {
        groups.yesterday.push(update);
      } else if (daysDiff <= 7) {
        groups.lastWeek.push(update);
      } else if (daysDiff <= 30) {
        groups.lastMonth.push(update);
      } else {
        groups.older.push(update);
      }
    });

    return groups;
  };

  // ... (previous helper functions)

  const groupedUpdates = groupUpdatesByDate(filteredUpdates);

  const renderDateGroup = (updates: Update[], title: string) => {
    if (updates.length === 0) return null;

    return (
      <div key={title}>
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 sticky top-0 bg-white dark:bg-slate-800 py-2">
          {title}
        </h3>
        <ul role="list" className="-mb-8">
          {updates.map((update, index) => (
            <li key={update.id}>
              <div className="relative pb-8">
                {index !== updates.length - 1 && (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ring-8 ring-white dark:ring-slate-900">
                      {getUpdateIcon(update.type)}
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
                        {new Date(update.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        {update.discipline}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card>
      {/* ... (previous header code) */}
      {isExpanded && (
        <CardContent>
          {/* ... (previous filter code) */}

          <div className="flow-root space-y-8">
            {filteredUpdates.length > 0 ? (
              <>
                {renderDateGroup(groupedUpdates.today, 'Today')}
                {renderDateGroup(groupedUpdates.yesterday, 'Yesterday')}
                {renderDateGroup(groupedUpdates.lastWeek, 'Last Week')}
                {renderDateGroup(groupedUpdates.lastMonth, 'Last Month')}
                {renderDateGroup(groupedUpdates.older, 'Older')}
              </>
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No updates match your filters
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentUpdates;