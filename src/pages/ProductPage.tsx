import React from 'react';
import { ArrowRight, Building2, Workflow, Boxes, Brain } from 'lucide-react';
import Button from '../components/ui/Button';

const ProductPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Product | Clashsense';
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Construction Backdrop */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Construction site"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-Powered Clash Detection
            <span className="block text-blue-500 mt-2">for Modern Construction</span>
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-3xl">
            Advanced clash detection and resolution powered by artificial intelligence. 
            Streamline your BIM coordination workflow and reduce construction delays.
          </p>
          <div className="mt-10 flex space-x-4">
            <Button size="lg" rightIcon={<ArrowRight size={18} />}>
              Request Demo
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Watch Video
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white dark:bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Intelligent Clash Resolution
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our AI-powered system automatically detects, analyzes, and suggests solutions for construction clashes.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 opacity-10"></div>
                </div>
                <div className="relative rounded-2xl bg-white dark:bg-slate-800 shadow-xl p-8">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500 text-white">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                    AI-Driven Analysis
                  </h3>
                  <p className="mt-4 text-slate-600 dark:text-slate-400">
                    Machine learning algorithms analyze your BIM models in real-time, identifying potential clashes before they become costly issues on-site.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Automated clash detection
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Severity classification
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Resolution prioritization
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 opacity-10"></div>
                </div>
                <div className="relative rounded-2xl bg-white dark:bg-slate-800 shadow-xl p-8">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500 text-white">
                    <Workflow className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                    Smart Resolution
                  </h3>
                  <p className="mt-4 text-slate-600 dark:text-slate-400">
                    Get intelligent suggestions for clash resolution that consider spatial constraints, building codes, and best practices.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Automated rerouting suggestions
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Code compliance checking
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                      Cost-impact analysis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">98%</div>
              <div className="mt-2 text-sm text-blue-100">Clash Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">75%</div>
              <div className="mt-2 text-sm text-blue-100">Faster Resolution Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">50%</div>
              <div className="mt-2 text-sm text-blue-100">Reduced Coordination Meetings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">30%</div>
              <div className="mt-2 text-sm text-blue-100">Cost Savings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;