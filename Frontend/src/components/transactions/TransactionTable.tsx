import React from 'react';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionTableProps {
  transactions: Transaction[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  sortBy,
  sortOrder,
  onSort
}) => {
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

  const SortButton: React.FC<{ field: string; children: React.ReactNode }> = ({ field, children }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left hover:text-green-400 transition-colors"
    >
      <span>{children}</span>
      <ArrowUpDown className="w-4 h-4" />
    </button>
  );

  if (transactions.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-400">No transactions found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                <SortButton field="name">Transaction</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                <SortButton field="date">Date</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                <SortButton field="amount">Amount</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Category
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-700/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740'}
                      alt={transaction.user.name}
                      className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform duration-200"
                    />
                    <div>
                      <p className="text-white font-medium">{transaction.name}</p>
                      <p className="text-gray-400 text-sm">{transaction.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-300">{transaction.date}</td>
                <td className="px-6 py-4 font-semibold">
                  {formatAmount(transaction.amount, transaction.type)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{transaction.category}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;