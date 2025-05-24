import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { CheckCircle2, Filter, ChevronRight, Building2, Clock, FileText, Box, Users2, MapPin } from 'lucide-react';
import Button from '../ui/Button';

interface ClashTask {
  id: string;
  description: string;
  discipline: 'MECH' | 'PL' | 'EL' | 'FP';
  severity: 'high' | 'medium' | 'low';
  status: 'new' | 'active' | 'approved' | 'resolved' | 'closed' | 'not-an-issue';
  location: string;
  level: string;
  date: string;
  modelSource: string;
  elementType: string;
  clashGroup: string;
  assignedTo: string;
  coordinates: string;
}

const ClashTodoList: React.FC = () => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedDiscipline, setExpandedDiscipline] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedElementType, setSelectedElementType] = useState<string | null>(null);
  const [selectedClashGroup, setSelectedClashGroup] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);

  const disciplines = [
    { code: 'MECH', name: 'Mechanical' },
    { code: 'PL', name: 'Plumbing' },
    { code: 'EL', name: 'Electrical' },
    { code: 'FP', name: 'Fire Protection' }
  ];

  const priorities = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const levels = [
    'Basement',
    'Level 1',
    'Level 2',
    'Level 3',
    'Level 4',
    'Roof'
  ];

  const statuses = [
    'new',
    'active',
    'approved',
    'resolved',
    'closed',
    'not-an-issue'
  ];

  const dateRanges = [
    'Today',
    'Last 7 days',
    'Last 30 days',
    'This month'
  ];

  const modelSources = [
    'HVAC_Revit_0523.rvt',
    'STRUCT_Revit_0523.rvt',
    'ELEC_Revit_0523.rvt',
    'PLUMB_Revit_0523.rvt'
  ];

  const elementTypes = [
    'Pipe',
    'Duct',
    'Beam',
    'Wall',
    'Cable Tray',
    'Equipment'
  ];

  const clashGroups = [
    'Hallway Clashes',
    'Riser Shaft',
    'Mechanical Room',
    'Office Area'
  ];

  const assignees = [
    'John Smith',
    'Sarah Johnson',
    'Mike Wilson',
    'Emma Davis'
  ];

  // Extended task data with new fields
  const allTasks: ClashTask[] = [
    {
      id: '1',
      description: 'Ductwork interference with structural beam on Level 3',
      discipline: 'MECH',
      severity: 'high',
      status: 'active',
      location: 'Level 3 - Grid A-5',
      level: 'Level 3',
      date: '2024-03-10',
      modelSource: 'HVAC_Revit_0523.rvt',
      elementType: 'Duct',
      clashGroup: 'Office Area',
      assignedTo: 'John Smith',
      coordinates: 'X: 120.5, Y: 45.2, Z: 35.8'
    },
    // ... (previous tasks with added fields)
  ];

  const toggleFilter = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    current: string | null
  ) => {
    setter(current === value ? null : value);
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    options: string[];
    selected: string | null;
    onChange: (value: string) => void;
  }> = ({ title, icon, options, selected, onChange }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        {icon}
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              selected === option
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const filteredTasks = allTasks.filter(task => {
    const disciplineMatch = expandedDiscipline 
      ? task.discipline === expandedDiscipline
      : selectedDisciplines.length === 0 || selectedDisciplines.includes(task.discipline);
    
    const priorityMatch = selectedPriority
      ? task.severity === selectedPriority
      : true;

    const levelMatch = selectedLevel
      ? task.level === selectedLevel
      : true;

    const statusMatch = selectedStatus
      ? task.status === selectedStatus
      : true;

    const modelMatch = selectedModel
      ? task.modelSource === selectedModel
      : true;

    const elementTypeMatch = selectedElementType
      ? task.elementType === selectedElementType
      : true;

    const clashGroupMatch = selectedClashGroup
      ? task.clashGroup === selectedClashGroup
      : true;

    const assigneeMatch = selectedAssignee
      ? task.assignedTo === selectedAssignee
      : true;

    return disciplineMatch && 
           priorityMatch && 
           levelMatch && 
           statusMatch && 
           modelMatch && 
           elementTypeMatch && 
           clashGroupMatch && 
           assigneeMatch;
  });

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
                onClick={() => {
                  setExpandedDiscipline(null);
                  setSelectedPriority(null);
                }}
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
              Filter
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 space-y-6">
            <FilterSection
              title="Building Levels"
              icon={<Building2 size={16} />}
              options={levels}
              selected={selectedLevel}
              onChange={(value) => toggleFilter(value, setSelectedLevel, selectedLevel)}
            />

            <FilterSection
              title="Clash Status"
              icon={<CheckCircle2 size={16} />}
              options={statuses}
              selected={selectedStatus}
              onChange={(value) => toggleFilter(value, setSelectedStatus, selectedStatus)}
            />

            <FilterSection
              title="Date Range"
              icon={<Clock size={16} />}
              options={dateRanges}
              selected={selectedDateRange}
              onChange={(value) => toggleFilter(value, setSelectedDateRange, selectedDateRange)}
            />

            <FilterSection
              title="Model Source"
              icon={<FileText size={16} />}
              options={modelSources}
              selected={selectedModel}
              onChange={(value) => toggleFilter(value, setSelectedModel, selectedModel)}
            />

            <FilterSection
              title="Element Type"
              icon={<Box size={16} />}
              options={elementTypes}
              selected={selectedElementType}
              onChange={(value) => toggleFilter(value, setSelectedElementType, selectedElementType)}
            />

            <FilterSection
              title="Clash Group"
              icon={<MapPin size={16} />}
              options={clashGroups}
              selected={selectedClashGroup}
              onChange={(value) => toggleFilter(value, setSelectedClashGroup, selectedClashGroup)}
            />

            <FilterSection
              title="Assigned To"
              icon={<Users2 size={16} />}
              options={assignees}
              selected={selectedAssignee}
              onChange={(value) => toggleFilter(value, setSelectedAssignee, selectedAssignee)}
            />
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
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                      {task.level}
                    </span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-medium">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>{task.location}</span>
                    <span>•</span>
                    <span>{task.assignedTo}</span>
                    <span>•</span>
                    <span>{new Date(task.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {task.status === 'resolved' && (
                    <CheckCircle2 className="text-emerald-500" size={20} />
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