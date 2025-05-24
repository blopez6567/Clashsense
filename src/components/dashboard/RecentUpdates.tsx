import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { FileEdit, GitMerge, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Filter, Calendar, Users2, X } from 'lucide-react';
import Button from '../ui/Button';

interface Update {
  id: number;
  type: 'modification' | 'merge' | 'issue' | 'resolution';
  model: string;
  user: string;
  action: string;
  timestamp: string;
  discipline: 'MECH' | 'ELEC' | 'PLUMB' | 'STRUCT';
}

const RecentUpdates: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const updates: Update[] = [
    // Today's updates
    {
      id: 1,
      type: 'modification',
      model: 'Mechanical System',
      user: 'Alex Chen',
      action: 'Updated ductwork routing in Level 2',
      timestamp: '2024-03-15T14:30:00',
      discipline: 'MECH'
    },
    {
      id: 2,
      type: 'merge',
      model: 'Structural Model',
      user: 'Sarah Johnson',
      action: 'Merged updated column locations',
      timestamp: '2024-03-15T12:15:00',
      discipline: 'STRUCT'
    },
    // Last Week
    {
      id: 3,
      type: 'issue',
      model: 'Electrical System',
      user: 'Mike Wilson',
      action: 'Reported new clash in service shaft',
      timestamp: '2024-03-14T16:45:00',
      discipline: 'ELEC'
    },
    {
      id: 4,
      type: 'resolution',
      model: 'Plumbing System',
      user: 'Emma Davis',
      action: 'Resolved pipe interference issue',
      timestamp: '2024-03-14T09:20:00',
      discipline: 'PLUMB'
    },
    // Last 2 Weeks
    {
      id: 5,
      type: 'modification',
      model: 'Electrical System',
      user: 'John Smith',
      action: 'Updated conduit routing in mechanical room',
      timestamp: '2024-03-08T15:30:00',
      discipline: 'ELEC'
    },
    {
      id: 6,
      type: 'issue',
      model: 'Mechanical System',
      user: 'Lisa Wong',
      action: 'Identified ductwork clash with structural beam',
      timestamp: '2024-03-07T11:45:00',
      discipline: 'MECH'
    },
    // Last Month
    {
      id: 7,
      type: 'modification',
      model: 'Plumbing System',
      user: 'David Miller',
      action: 'Rerouted main water supply line',
      timestamp: '2024-02-28T10:15:00',
      discipline: 'PLUMB'
    },
    {
      id: 8,
      type: 'merge',
      model: 'Structural Model',
      user: 'Rachel Adams',
      action: 'Updated foundation details',
      timestamp: '2024-02-25T14:20:00',
      discipline: 'STRUCT'
    },
    {
      id: 9,
      type: 'resolution',
      model: 'Mechanical System',
      user: 'Tom Wilson',
      action: 'Resolved AHU clearance issues',
      timestamp: '2024-02-22T09:30:00',
      discipline: 'MECH'
    },
    {
      id: 10,
      type: 'modification',
      model: 'Electrical System',
      user: 'Emily Chen',
      action: 'Updated emergency lighting layout',
      timestamp: '2024-02-20T16:45:00',
      discipline: 'ELEC'
    }
  ];

  const dateRanges = [
    { label: 'Today', value: '1' },
    { label: 'Last 3 days', value: '3' },
    { label: 'Last week', value: '7' },
    { label: 'Last month', value: '30' }
  ];

  const disciplines = [
    { code: 'MECH', name: 'Mechanical' },
    { code: 'ELEC', name: 'Electrical' },
    { code: 'PLUMB', name: 'Plumbing' },
    { code: 'STRUCT', name: 'Structural' }
  ];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'modification':
        return <FileEdit size={16} className="text-blue-500" />;
      case 'merge':
        return <GitMerge size={16} className="text-purple-500" />;
      case 'issue':
        return <AlertCircle size={16} className="text-amber-500" />;
      case 'resolution':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      default:
        return null;
    }
  };

  const isWithinDateRange = (timestamp: string, days: number) => {
    if (!days) return true;
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  };

  const filteredUpdates = updates.filter(update => {
    const matchesDiscipline = selectedDisciplines.length === 0 || 
      selectedDisciplines.includes(update.discipline);
    
    const matchesDate = !selectedDateRange || 
      isWithinDateRange(update.timestamp, parseInt(selectedDateRange));
    
    const matchesSearch = searchTerm === '' || 
      update.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.model.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDiscipline && matchesDate && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedDisciplines([]);
    setSelectedDateRange(null);
    setSearchTerm('');
  };

  const toggleDiscipline = (code: string) => {
    setSelectedDisciplines(prev =>
      prev.includes(code)
        ? prev.filter(d => d !== code)
        : [...prev, code]
    );
  };

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Model Updates</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter size={16} />}
              onClick={(e) => {
                e.stopPropagation();
                setShowFilters(!showFilters);
              }}
            >
              Filter
            </Button>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {showFilters && (
            <div className="mb-6 space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by user, action, or model..."
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Disciplines
                </label>
                <div className="flex flex-wrap gap-2">
                  {disciplines.map((discipline) => (
                    <button
                      key={discipline.code}
                      onClick={() => toggleDiscipline(discipline.code)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                        selectedDisciplines.includes(discipline.code)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {discipline.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {dateRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setSelectedDateRange(
                        selectedDateRange === range.value ? null : range.value
                      )}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                        selectedDateRange === range.value
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedDisciplines.length > 0 || selectedDateRange || searchTerm) && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<X size={16} />}
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="flow-root">
            {filteredUpdates.length > 0 ? (
              <ul role="list" className="-mb-8">
                {filteredUpdates.map((update, updateIdx) => (
                  <li key={update.id}>
                    <div className="relative pb-8">
                      {updateIdx !== filteredUpdates.length - 1 ? (
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700"
                          aria-hidden="true"
                        />
                      ) : null}
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
                              {new Date(update.timestamp).toLocaleString()}
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