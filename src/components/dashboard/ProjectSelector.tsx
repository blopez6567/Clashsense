import React, { useState, useEffect } from 'react';
import { Users2, Calendar, Clock, ArrowLeft, Building2, ChevronDown } from 'lucide-react';
import { ProjectData } from '../../types';
import Button from '../ui/Button';

interface ProjectSelectorProps {
  onProjectChange: (project: ProjectData) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onProjectChange }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowStickyHeader(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('project-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowProjectDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    },
    {
      id: '4',
      name: 'Residential Complex Phase 1',
      client: 'Urban Living Developers',
      lastUpdated: '2024-03-12',
      teamSize: 25,
      progress: 35,
      phase: 'Schematic Design',
      deadline: '2025-02-28',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg',
      modelStats: {
        total: 28,
        updated: 20,
        reviewing: 8
      },
      clashStats: {
        total: 145,
        critical: 32,
        major: 58,
        minor: 55,
        resolved: 42
      },
      disciplineProgress: {
        MECH: { total: 38, resolved: 12 },
        PL: { total: 32, resolved: 10 },
        EL: { total: 45, resolved: 15 },
        FP: { total: 30, resolved: 5 }
      }
    },
    {
      id: '5',
      name: 'Shopping Mall Renovation',
      client: 'Retail Solutions Inc.',
      lastUpdated: '2024-03-11',
      teamSize: 30,
      progress: 72,
      phase: 'Construction Documentation',
      deadline: '2024-09-15',
      image: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg',
      modelStats: {
        total: 42,
        updated: 38,
        reviewing: 4
      },
      clashStats: {
        total: 167,
        critical: 18,
        major: 72,
        minor: 77,
        resolved: 120
      },
      disciplineProgress: {
        MECH: { total: 48, resolved: 35 },
        PL: { total: 35, resolved: 28 },
        EL: { total: 55, resolved: 40 },
        FP: { total: 29, resolved: 17 }
      }
    },
    {
      id: '6',
      name: 'Research Facility Expansion',
      client: 'BioTech Research Labs',
      lastUpdated: '2024-03-10',
      teamSize: 38,
      progress: 55,
      phase: 'Design Development',
      deadline: '2024-11-30',
      image: 'https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg',
      modelStats: {
        total: 51,
        updated: 43,
        reviewing: 8
      },
      clashStats: {
        total: 212,
        critical: 38,
        major: 85,
        minor: 89,
        resolved: 115
      },
      disciplineProgress: {
        MECH: { total: 58, resolved: 32 },
        PL: { total: 42, resolved: 23 },
        EL: { total: 65, resolved: 35 },
        FP: { total: 47, resolved: 25 }
      }
    }
  ];

  const handleProjectSelect = (project: ProjectData) => {
    setSelectedProjectId(project.id);
    onProjectChange(project);
    setShowProjectDropdown(false);
  };

  const handleBack = () => {
    setSelectedProjectId(null);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <>
      {/* Sticky Project Header */}
      {selectedProject && showStickyHeader && (
        <div className="fixed top-16 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-40 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="relative">
                <button
                  onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                  className="flex items-center space-x-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">{selectedProject.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedProject.client}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {/* Project Dropdown */}
                {showProjectDropdown && (
                  <div 
                    id="project-dropdown"
                    className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <div className="max-h-96 overflow-y-auto">
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => handleProjectSelect(project)}
                          className={`w-full flex items-center space-x-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                            project.id === selectedProject.id ? 'bg-slate-50 dark:bg-slate-700/50' : ''
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={project.image} 
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white">{project.name}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{project.client}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Users2 className="h-4 w-4" />
                  <span>{selectedProject.teamSize} members</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Building2 className="h-4 w-4" />
                  <span>{selectedProject.phase}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ArrowLeft size={16} />}
                  onClick={handleBack}
                >
                  View All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Project Selector Content */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Projects</h2>
          {selectedProjectId && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft size={16} />}
              onClick={handleBack}
            >
              View All Projects
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {selectedProjectId ? (
          // Show only the selected project
          selectedProject && (
            <button
              key={selectedProject.id}
              onClick={() => handleProjectSelect(selectedProject)}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border-2 overflow-hidden hover:shadow-md transition-all duration-200 text-left border-blue-500 dark:border-blue-400 shadow-md ring-2 ring-blue-500/20"
            >
              <div className="relative h-48 w-full">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">{selectedProject.name}</h3>
                  <p className="text-sm text-white/80">{selectedProject.client}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <Users2 className="h-4 w-4 mr-1" />
                    {selectedProject.teamSize} members
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(selectedProject.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Progress</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedProject.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-600 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedProject.phase}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )
        ) : (
          // Show all projects when none is selected
          projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border-2 overflow-hidden hover:shadow-md transition-all duration-200 text-left border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500"
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
                        className="h-full rounded-full bg-blue-400"
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
          ))
        )}
      </div>
      </div>
    </>
  );
};

export default ProjectSelector;