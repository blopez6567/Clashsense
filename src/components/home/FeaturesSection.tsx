import React from 'react';
import { Shield, TrendingUp, Wallet, LineChart, Clock, BarChart4 } from 'lucide-react';

const features = [
  {
    name: 'Intelligent Investing',
    description: 'Our AI-powered portfolio management provides personalized investment strategies based on your goals and risk tolerance.',
    icon: TrendingUp,
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    name: 'Smart Savings',
    description: 'Optimize your savings with automated tools that help you save more without changing your lifestyle.',
    icon: Wallet,
    color: 'from-teal-400 to-teal-600',
  },
  {
    name: 'Retirement Planning',
    description: 'Plan your future with interactive tools that project your retirement needs and help you meet your goals.',
    icon: Clock,
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    name: 'Advanced Analytics',
    description: 'Get insights into your spending patterns, investment performance, and financial health with detailed analytics.',
    icon: BarChart4,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Market Insights',
    description: 'Stay informed with real-time market data, news alerts, and expert analysis tailored to your portfolio.',
    icon: LineChart,
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    name: 'Bank-Level Security',
    description: 'Rest easy knowing your financial data is protected with enterprise-grade encryption and security protocols.',
    icon: Shield,
    color: 'from-purple-400 to-purple-600',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to succeed financially
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 dark:text-slate-300 mx-auto">
            Our comprehensive suite of tools and features helps you make smarter financial decisions.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root h-full rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-6 pb-8 transition-all duration-300 hover:shadow-md">
                  <div className="-mt-6">
                    <div>
                      <span className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${feature.color} rounded-md shadow-sm`}>
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-slate-900 dark:text-white tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-slate-500 dark:text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;