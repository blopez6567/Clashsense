import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { FileEdit, GitMerge, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Filter, Calendar, Users2, X } from 'lucide-react';
import Button from '../ui/Button';

interface Update {
  id: string;
  type: 'edit' | 'merge' | 'alert' | 'success';
  user: string;
  action: string;
  model: string;
  timestamp: string;
  discipline: string;
}

const RecentUpdates: React.FC = () => {
  const currentDate = new Date();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('all');

  // Mock data - replace with actual data from your API/database
  const [updates] = useState<Update[]>([
    {
      id: '1',
      type: 'edit',
      user: 'John Doe',
      action: 'Modified structural beam dimensions',
      model: 'Building A - Structure',
      timestamp: new Date().toISOString(),
      discipline: 'Structural'
    },
    // Add more mock updates as needed
  ]);

  const [filteredUpdates, setFilteredUpdates] = useState<Update[]>(updates);

  const getUpdateIcon = (type: Update['type']) => {
    switch (type) {
      case 'edit':
        return <FileEdit className="h-5 w-5 text-blue-500" />;
      case 'merge':
        return <GitMerge className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Recent Updates</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {showFilters && (
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={dateRange === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('all')}
                >
                  All Time
                </Button>
                <Button
                  variant={dateRange === 'today' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('today')}
                >
                  Today
                </Button>
                <Button
                  variant={dateRange === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('week')}
                >
                  This Week
                </Button>
                <Button
                  variant={dateRange === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('month')}
                >
                  This Month
                </Button>
              </div>
            </div>
          )}

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