import React from 'react';
import { Users2, HardHat, Building2, Ruler, Wrench, Hammer, FileCheck2, Boxes } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface RoleCard {
  title: string;
  icon: React.ReactNode;
  description: string;
  phases: string[];
  responsibilities: string[];
  image: string;
}

const SolutionsPage: React.FC = () => {
  const roles: RoleCard[] = [
    {
      title: 'General Contractors',
      icon: <HardHat className="h-8 w-8 text-blue-500" />,
      description: 'Oversee project coordination and ensure seamless integration of all building systems.',
      phases: ['SD', 'DD', 'CD', 'Shop Drawings'],
      responsibilities: [
        'Project timeline management',
        'Cost control and optimization',
        'Trade coordination',
        'Construction sequencing'
      ],
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg'
    },
    {
      title: 'MEP Modelers',
      icon: <Wrench className="h-8 w-8 text-blue-500" />,
      description: 'Create and maintain detailed 3D models of mechanical, electrical, and plumbing systems.',
      phases: ['DD', 'CD', 'Shop Drawings'],
      responsibilities: [
        'Detailed system modeling',
        'Shop drawing production',
        'Installation coordination',
        'Fabrication optimization'
      ],
      image: 'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg'
    },
    {
      title: 'BIM Managers',
      icon: <Building2 className="h-8 w-8 text-blue-500" />,
      description: 'Lead BIM implementation and maintain model integrity throughout the project lifecycle.',
      phases: ['SD', 'DD', 'CD'],
      responsibilities: [
        'BIM execution planning',
        'Model quality control',
        'Standards enforcement',
        'Technology integration'
      ],
      image: 'https://images.pexels.com/photos/7245333/pexels-photo-7245333.jpeg'
    },
    {
      title: 'Design Consultants',
      icon: <Ruler className="h-8 w-8 text-blue-500" />,
      description: 'Provide specialized expertise in architectural and engineering design aspects.',
      phases: ['SD', 'DD'],
      responsibilities: [
        'Design development',
        'System specifications',
        'Performance optimization',
        'Code compliance'
      ],
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg'
    }
  ];

  const PhaseIndicator: React.FC<{ phase: string; active: boolean }> = ({ phase, active }) => (
    <div className={`px-2 py-1 rounded text-xs font-medium ${active ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
      {phase}
    </div>
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Solutions</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Tailored coordination solutions for every role in your BIM workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => (
            <Card key={role.title} className="overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={role.image} 
                  alt={role.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                      {role.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-white">{role.title}</h2>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {role.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Project Phases
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['SD', 'DD', 'CD', 'Shop Drawings'].map((phase) => (
                      <PhaseIndicator 
                        key={phase} 
                        phase={phase} 
                        active={role.phases.includes(phase)} 
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {role.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-center text-slate-600 dark:text-slate-400">
                        <FileCheck2 className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full mt-6">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;