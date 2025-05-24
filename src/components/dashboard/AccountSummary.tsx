import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface AccountSummaryProps {
  totalBalance: number;
  changePercentage: number;
  savings: number;
  investments: number;
  alerts: number;
}

const AccountSummary: React.FC<AccountSummaryProps> = ({
  totalBalance = 42856.78,
  changePercentage = 2.3,
  savings = 15420.50,
  investments = 27436.28,
  alerts = 2
}) => {
  const isPositiveChange = changePercentage >= 0;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Account Summary</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center text-2xl text-slate-400 dark:text-slate-500 mb-1">
              <DollarSign size={24} className="mr-2" />
              <span>Total Balance</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">${totalBalance.toLocaleString()}</span>
              <div className={`ml-4 flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                {isPositiveChange ? <TrendingUp size={18} className="mr-1" /> : <TrendingDown size={18} className="mr-1" />}
                <span className="font-medium">{isPositiveChange ? '+' : ''}{changePercentage}%</span>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Savings</div>
                <div className="text-xl font-semibold text-slate-900 dark:text-white">${savings.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Investments</div>
                <div className="text-xl font-semibold text-slate-900 dark:text-white">${investments.toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 right-0">
              <div className="flex items-center">
                <AlertCircle size={18} className="text-amber-500 mr-2" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{alerts} alerts</span>
              </div>
            </div>
            
            <div className="h-full flex flex-col justify-center pt-8">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full"
                  style={{ width: `${(savings / totalBalance) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Savings ({Math.round((savings / totalBalance) * 100)}%)</span>
                <span>Investments ({Math.round((investments / totalBalance) * 100)}%)</span>
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quick Actions</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-xs font-medium rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
                    Add Funds
                  </button>
                  <button className="px-3 py-2 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    Transfer
                  </button>
                  <button className="px-3 py-2 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSummary;