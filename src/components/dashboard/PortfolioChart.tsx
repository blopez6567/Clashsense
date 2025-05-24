import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';

const PortfolioChart: React.FC = () => {
  // In a real app, you would use a proper charting library like Chart.js or Recharts
  // For this demo, we'll create a simplified visual representation
  
  const portfolioData = [
    { name: 'Stocks', percentage: 42, color: 'bg-emerald-500' },
    { name: 'Bonds', percentage: 23, color: 'bg-teal-500' },
    { name: 'Real Estate', percentage: 17, color: 'bg-cyan-500' },
    { name: 'Crypto', percentage: 11, color: 'bg-blue-500' },
    { name: 'Cash', percentage: 7, color: 'bg-slate-500' },
  ];

  const monthlyPerformance = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 28 },
    { month: 'Apr', value: 45 },
    { month: 'May', value: 40 },
    { month: 'Jun', value: 60 },
    { month: 'Jul', value: 68 },
    { month: 'Aug', value: 72 },
    { month: 'Sep', value: 80 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 90 },
    { month: 'Dec', value: 95 },
  ];

  const maxValue = Math.max(...monthlyPerformance.map(item => item.value));
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Portfolio Overview</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Allocation */}
          <div>
            <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-4">Asset Allocation</h3>
            <div className="flex justify-between items-end mb-2">
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden">
                {portfolioData.map((item, index) => (
                  <div
                    key={item.name}
                    className={`h-full ${item.color} float-left`}
                    style={{
                      width: `${item.percentage}%`,
                      marginLeft: index === 0 ? '0' : '-2px',
                      borderRadius: index === 0 ? '9999px 0 0 9999px' : index === portfolioData.length - 1 ? '0 9999px 9999px 0' : '0',
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {portfolioData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                  <div className="flex-1 flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Performance Chart */}
          <div>
            <h3 className="text-base font-medium text-slate-700 dark:text-slate-300 mb-4">Annual Performance</h3>
            <div className="h-40 flex items-end space-x-2">
              {monthlyPerformance.map((item) => (
                <div key={item.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-sm hover:from-emerald-600 hover:to-teal-500 transition-colors"
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Current Value</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-white">$27,436.28</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Return</p>
              <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+18.4%</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">YTD Return</p>
              <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+12.8%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioChart;