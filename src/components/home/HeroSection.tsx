import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900">
      {/* Decorative element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Smart Reroutes</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Seamless Coordination
            </span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-lg text-slate-600 dark:text-slate-300 sm:max-w-3xl">
            Empowering you to manage, resolve, and coordinate your projects with cutting-edge technology and personalized insights.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                Get started
              </Button>
              <Button size="lg" variant="outline">
                Learn more
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-slate-900 px-4 text-sm text-slate-500 dark:text-slate-400">
              Predictive routing powered by AI
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-1 flex justify-center items-center">
            <img 
              src="https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Company logo" 
              className="h-12 filter grayscale opacity-40 hover:opacity-70 transition-opacity"
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img 
              src="https://images.pexels.com/photos/6693652/pexels-photo-6693652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Company logo" 
              className="h-12 filter grayscale opacity-40 hover:opacity-70 transition-opacity" 
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img 
              src="https://images.pexels.com/photos/6693662/pexels-photo-6693662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Company logo" 
              className="h-12 filter grayscale opacity-40 hover:opacity-70 transition-opacity" 
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img 
              src="https://images.pexels.com/photos/6693700/pexels-photo-6693700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Company logo" 
              className="h-12 filter grayscale opacity-40 hover:opacity-70 transition-opacity" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;