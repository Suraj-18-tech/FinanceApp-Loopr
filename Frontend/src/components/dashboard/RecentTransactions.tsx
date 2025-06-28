import React from 'react';
import { Transaction } from '../../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions, onViewAll }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/30 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-900/30 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-500/30';
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'income' ? '+' : '-';
    const color = type === 'income' ? 'text-green-400' : 'text-red-400';
    return <span className={color}>{prefix}${Math.abs(amount).toLocaleString()}</span>;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        <button
          onClick={onViewAll}
          className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <img
                src={ 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740'}
                alt={transaction.user.name}
                className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-200"
              />
              <div>
                <p className="text-white font-medium">{transaction.name}</p>
                <p className="text-gray-400 text-sm">{transaction.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
              <span className="font-semibold">
                {formatAmount(transaction.amount, transaction.type)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;