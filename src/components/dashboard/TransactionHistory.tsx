import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ShoppingCart, Coffee, CreditCard, Home, Plus } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: 'shopping' | 'food' | 'bills' | 'housing' | 'transfer' | 'other';
}

const transactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary Deposit',
    amount: 3200,
    date: '2023-05-01',
    type: 'income',
    category: 'transfer',
  },
  {
    id: '2',
    description: 'Amazon Purchase',
    amount: 56.78,
    date: '2023-05-02',
    type: 'expense',
    category: 'shopping',
  },
  {
    id: '3',
    description: 'Starbucks Coffee',
    amount: 5.25,
    date: '2023-05-03',
    type: 'expense',
    category: 'food',
  },
  {
    id: '4',
    description: 'Rent Payment',
    amount: 1500,
    date: '2023-05-04',
    type: 'expense',
    category: 'housing',
  },
  {
    id: '5',
    description: 'Credit Card Payment',
    amount: 300,
    date: '2023-05-05',
    type: 'expense',
    category: 'bills',
  },
];

const getCategoryIcon = (category: Transaction['category']) => {
  switch (category) {
    case 'shopping':
      return <ShoppingCart size={16} />;
    case 'food':
      return <Coffee size={16} />;
    case 'bills':
      return <CreditCard size={16} />;
    case 'housing':
      return <Home size={16} />;
    case 'transfer':
      return <ArrowUpRight size={16} />;
    default:
      return <Plus size={16} />;
  }
};

const TransactionHistory: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Transactions</h2>
        <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
          View all
        </button>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {transaction.type === 'income' ? <ArrowUpRight size={18} /> : getCategoryIcon(transaction.category)}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(transaction.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                transaction.type === 'income' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;