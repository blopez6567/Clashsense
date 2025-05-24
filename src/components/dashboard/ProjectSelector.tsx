import React from 'react';
import { Users2, Calendar, Clock } from 'lucide-react';
import { ProjectData } from '../../types';

interface ProjectSelectorProps {
  onProjectChange: (project: ProjectData) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onProjectChange }) => {
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
      image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg',
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
      image: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg',
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
      image: 'https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg',
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onProjectChange(project)}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all duration-200 text-left"
          >
            <div className="relative h-48 w-full">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="text-sm text-white/80">{project.client}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <Users2 className="h-4 w-4 mr-1" />
                  {project.teamSize} members
                </div>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(project.lastUpdated).toLocaleDateString()}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="font-medium text-slate-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {project.phase}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectSelector;