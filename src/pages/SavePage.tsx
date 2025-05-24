import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Wallet, Rocket, Shield, Umbrella, ArrowRight } from 'lucide-react';

const SavePage: React.FC = () => {
  // Update document title when component mounts
  React.useEffect(() => {
    document.title = 'Save | Origin Finance';
  }, []);

  const savingProducts = [
    {
      id: 1,
      title: 'Origin Core Savings',
      description: 'Our standard savings account with competitive interest rates and no minimum balance.',
      interestRate: '1.5%',
      features: [
        'No monthly fees',
        'No minimum balance',
        'Unlimited withdrawals',
        'FDIC insured',
      ],
      icon: <Wallet size={24} className="text-blue-600 dark:text-blue-400" />,
      recommended: false,
    },
    {
      id: 2,
      title: 'Origin Boost Savings',
      description: 'High-yield savings account with premium interest rates designed for serious savers.',
      interestRate: '3.5%',
      features: [
        'No monthly fees with $1,000 minimum balance',
        'Premium interest rate',
        'Up to 6 free withdrawals per month',
        'FDIC insured',
      ],
      icon: <Rocket size={24} className="text-emerald-600 dark:text-emerald-400" />,
      recommended: true,
    },
    {
      id: 3,
      title: 'Origin Reserve CD',
      description: 'Lock in a guaranteed rate of return with our certificate of deposit accounts.',
      interestRate: '4.0%',
      features: [
        '12-month term',
        '$500 minimum opening deposit',
        'Fixed interest rate',
        'FDIC insured',
      ],
      icon: <Shield size={24} className="text-purple-600 dark:text-purple-400" />,
      recommended: false,
    },
    {
      id: 4,
      title: 'Origin Emergency Fund',
      description: 'Prepare for the unexpected with our dedicated emergency fund account.',
      interestRate: '2.0%',
      features: [
        'Automated savings rules',
        'Quick access in emergencies',
        'Goal-based saving tools',
        'FDIC insured',
      ],
      icon: <Umbrella size={24} className="text-amber-600 dark:text-amber-400" />,
      recommended: false,
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Save</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Build your financial foundation with our range of savings options
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Smart Savings</h2>
              <p className="mt-2 text-emerald-100">
                Our AI-powered savings algorithm analyzes your spending patterns and automatically sets aside money you won't miss. On average, users save an extra $1,700 per year.
              </p>
              <Button 
                className="mt-6 bg-white text-emerald-700 hover:bg-slate-100" 
                rightIcon={<ArrowRight size={18} />}
              >
                Activate Smart Savings
              </Button>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Smart Savings" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <p className="text-xs text-slate-600 dark:text-slate-400">Average monthly savings</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">$142</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Savings Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savingProducts.map((product) => (
            <Card 
              key={product.id} 
              hoverable 
              className={`transition-all duration-300 ease-in-out ${product.recommended ? 'border-2 border-emerald-500 dark:border-emerald-400' : ''}`}
            >
              {product.recommended && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <CardHeader className="flex items-start">
                <div className="mr-4 p-3 rounded-md bg-slate-100 dark:bg-slate-700">
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{product.title}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    {product.interestRate} APY
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{product.description}</p>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-emerald-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-slate-600 dark:text-slate-400">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button fullWidth>Open Account</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Savings Calculator</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Use our calculator to see how your savings can grow over time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="initial-deposit" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Initial Deposit
              </label>
              <input
                type="number"
                id="initial-deposit"
                defaultValue={1000}
                className="block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="monthly-contribution" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Monthly Contribution
              </label>
              <input
                type="number"
                id="monthly-contribution"
                defaultValue={100}
                className="block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="time-period" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Time Period (years)
              </label>
              <input
                type="number"
                id="time-period"
                defaultValue={5}
                className="block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button>Calculate Savings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavePage;