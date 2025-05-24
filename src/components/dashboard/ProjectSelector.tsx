import React, { useState } from 'react';
import { ChevronDown, Building2, Calendar, Users2, Clock } from 'lucide-react';
import Card from '../ui/Card';

export interface ProjectData {
  id: string;
  name: string;
  client: string;
  lastUpdated: string;
  teamSize: number;
  progress: number;
  phase: string;
  deadline: string;
  modelStats: {
    total: number;
    updated: number;
    reviewing: number;
  };
  clashStats: {
    total: number;
    critical: number;
    major: number;
    minor: number;
    resolved: number;
  };
  disciplineProgress: {
    MECH: { total: number; resolved: number; };
    PL: { total: number; resolved: number; };
    EL: { total: number; resolved: number; };
    FP: { total: number; resolved: number; };
  };
}

interface ProjectSelectorProps {
  onProjectChange: (project: ProjectData) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onProjectChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const projects: ProjectData[] = [
    {
      id: '1',
      name: 'Hospital Wing Extension - Phase 2',
      client: 'City General Hospital',
      lastUpdated: '2024-03-15',
      teamSize: 28,
      progress: 65,
      phase: 'Construction Documentation',
      deadline: '2024-08-30',
      modelStats: {
        total: 47,
        updated: 42,
        reviewing: 4
      },
      clashStats: {
        total: 156,
        critical: 24,
        major: 67,
        minor: 65,
        resolved: 98
      },
      disciplineProgress: {
        MECH: { total: 45, resolved: 32 },
        PL: { total: 38, resolved: 25 },
        EL: { total: 52, resolved: 41 },
        FP: { total: 21, resolved: 18 }
      }
    },
    {
      id: '2',
      name: 'Tech Campus Building B',
      client: 'Innovation Tech',
      lastUpdated: '2024-03-14',
      teamSize: 35,
      progress: 42,
      phase: 'Design Development',
      deadline: '2024-12-15',
      modelStats: {
        total: 32,
        updated: 28,
        reviewing: 6
      },
      clashStats: {
        total: 234,
        critical: 45,
        major: 89,
        minor: 100,
        resolved: 76
      },
      disciplineProgress: {
        MECH: { total: 68, resolved: 24 },
        PL: { total: 45, resolved: 18 },
        EL: { total: 78, resolved: 25 },
        FP: { total: 43, resolved: 9 }
      }
    },
    {
      id: '3',
      name: 'Downtown Office Tower',
      client: 'Metropolitan Developments',
      lastUpdated: '2024-03-13',
      teamSize: 42,
      progress: 88,
      phase: 'Construction Administration',
      deadline: '2024-06-30',
      modelStats: {
        total: 56,
        updated: 53,
        reviewing: 2
      },
      clashStats: {
        total: 189,
        critical: 12,
        major: 45,
        minor: 132,
        resolved: 165
      },
      disciplineProgress: {
        MECH: { total: 52, resolved: 48 },
        PL: { total: 43, resolved: 39 },
        EL: { total: 61, resolved: 52 },
        FP: { total: 33, resolved: 26 }
      }
    }
  ];

  const [selectedProject, setSelectedProject] = useState<ProjectData>(projects[0]);

  const handleProjectSelect = (project: ProjectData) => {
    setSelectedProject(project);
    setIsOpen(false);
    onProjectChange(project);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-slate-900 dark:text-white">{selectedProject.name}</h3>
            <div className="flex items-center mt-1 space-x-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{selectedProject.client}</span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {selectedProject.phase}
              </span>
            </div>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card>
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-200 dark:divide-slate-700">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`w-full p-4 flex items-start space-x-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                    project.id === selectedProject.id ? 'bg-slate-50 dark:bg-slate-700/50' : ''
                  }`}
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-slate-900 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{project.client}</p>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Updated {new Date(project.lastUpdated).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users2 className="h-4 w-4 mr-1" />
                        {project.teamSize} team members
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {project.phase}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-slate-300">Progress</span>
                        <span className="font-medium text-slate-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;