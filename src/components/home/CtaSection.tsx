import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <div className="bg-blue-700 dark:bg-blue-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to take control of your financial future?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of users who have transformed their relationship with money. Get started today with a free account and begin your journey to financial freedom.
            </p>
            <div className="mt-8 flex space-x-4">
              <Button 
                size="lg" 
                rightIcon={<ArrowRight size={18} />}
                className="bg-white text-blue-800 hover:bg-slate-100"
              >
                Get started for free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-blue-600"
              >
                View pricing
              </Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="pl-4 sm:pl-8 lg:pl-0 lg:pr-4">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl shadow-xl">
                <img
                  src="https://images.pexels.com/photos/6693637/pexels-photo-6693637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Dashboard preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;