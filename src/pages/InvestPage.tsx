import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { TrendingUp, PieChart, Activity, BarChart4, Briefcase, ArrowRight } from 'lucide-react';

const InvestPage: React.FC = () => {
  // Update document title when component mounts
  React.useEffect(() => {
    document.title = 'Invest | Origin Finance';
  }, []);

  const investmentOptions = [
    {
      id: 1,
      title: 'Growth Portfolio',
      description: 'High growth potential with higher risk. Recommended for long-term investors.',
      risk: 'High',
      returnRate: '8-12%',
      minInvestment: 1000,
      icon: <TrendingUp size={24} className="text-emerald-600 dark:text-emerald-400" />,
    },
    {
      id: 2,
      title: 'Balanced Portfolio',
      description: 'Moderate growth with balanced risk. Ideal for medium-term financial goals.',
      risk: 'Medium',
      returnRate: '5-8%',
      minInvestment: 500,
      icon: <PieChart size={24} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 3,
      title: 'Conservative Portfolio',
      description: 'Lower risk with stable returns. Perfect for risk-averse investors.',
      risk: 'Low',
      returnRate: '3-5%',
      minInvestment: 250,
      icon: <Activity size={24} className="text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 4,
      title: 'Tech Sector Fund',
      description: 'Focused on technology companies with high growth potential.',
      risk: 'High',
      returnRate: '10-15%',
      minInvestment: 2000,
      icon: <BarChart4 size={24} className="text-purple-600 dark:text-purple-400" />,
    },
    {
      id: 5,
      title: 'ESG Responsible Fund',
      description: 'Investments in environmentally and socially responsible companies.',
      risk: 'Medium',
      returnRate: '6-9%',
      minInvestment: 1000,
      icon: <Briefcase size={24} className="text-teal-600 dark:text-teal-400" />,
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Invest</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Grow your wealth with our carefully curated investment options
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Investment Quiz</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Not sure where to start? Take our quick investment quiz to get personalized recommendations based on your goals and risk tolerance.
              </p>
              <Button className="mt-4" rightIcon={<ArrowRight size={18} />}>
                Take the quiz
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/7821486/pexels-photo-7821486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Investment Quiz" 
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Investment Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentOptions.map((option) => (
            <Card key={option.id} hoverable>
              <CardHeader className="flex items-start">
                <div className="mr-4 p-3 rounded-md bg-slate-100 dark:bg-slate-700">
                  {option.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{option.title}</h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      option.risk === 'High' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                        : option.risk === 'Medium'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {option.risk} Risk
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      {option.returnRate} Est. Return
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{option.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Minimum Investment: <span className="font-semibold text-slate-900 dark:text-white">${option.minInvestment}</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button fullWidth>Invest Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestPage;