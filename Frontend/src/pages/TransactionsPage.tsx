import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import Alert from '../components/ui/Alert';
import { Transaction } from '../types';

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [alert, setAlert] = useState({ type: 'info' as const, message: '', isVisible: false });

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        name: 'Salary Payment',
        amount: 5000,
        date: '2024-04-20',
        status: 'completed',
        type: 'income',
        category: 'Salary',
        description: 'Monthly salary payment',
        user: {
          id: '1',
          name: 'Matheus Ferreira',
          email: 'matheus@example.com',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        }
      },
      {
        id: '2',
        name: 'Freelance Project',
        amount: 850,
        date: '2024-04-18',
        status: 'completed',
        type: 'income',
        category: 'Freelance',
        description: 'Web development project',
        user: {
          id: '2',
          name: 'Floyd Miles',
          email: 'floyd@example.com',
          avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        }
      },
      {
        id: '3',
        name: 'Office Supplies',
        amount: 230,
        date: '2024-04-17',
        status: 'pending',
        type: 'expense',
        category: 'Office',
        description: 'Monthly office supplies',
        user: {
          id: '3',
          name: 'Jerome Bell',
          email: 'jerome@example.com',
          avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        }
      },
      {
        id: '4',
        name: 'Grocery Shopping',
        amount: 156,
        date: '2024-04-15',
        status: 'completed',
        type: 'expense',
        category: 'Food',
        description: 'Weekly grocery shopping',
        user: {
          id: '4',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        }
      },
      {
        id: '5',
        name: 'Investment Dividend',
        amount: 320,
        date: '2024-04-12',
        status: 'completed',
        type: 'income',
        category: 'Investment',
        description: 'Quarterly dividend payment',
        user: {
          id: '5',
          name: 'Mike Chen',
          email: 'mike@example.com',
          avatar: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        }
      },
      {
        id: '6',
        name: 'Utility Bill',
        amount: 89,
        date: '2024-04-10',
        status: 'failed',
        type: 'expense',
        category: 'Utilities',
        description: 'Monthly electricity bill',
        user: {
          id: '6',
          name: 'Lisa Wang',
          email: 'lisa@example.com',
          avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        }
      }
    ];

    setTransactions(mockTransactions);
  }, []);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || transaction.status === statusFilter;
      const matchesType = !typeFilter || transaction.type === typeFilter;
      
      const matchesDateRange = (!dateRange.start || new Date(transaction.date) >= new Date(dateRange.start)) &&
                             (!dateRange.end || new Date(transaction.date) <= new Date(dateRange.end));

      return matchesSearch && matchesStatus && matchesType && matchesDateRange;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [transactions, searchTerm, statusFilter, typeFilter, dateRange, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
    setDateRange({ start: '', end: '' });
    setSortBy('date');
    setSortOrder('desc');
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'Date', 'Amount', 'Type', 'Status', 'Category', 'User', 'Description'],
      ...filteredAndSortedTransactions.map(t => [
        t.name,
        t.date,
        t.amount.toString(),
        t.type,
        t.status,
        t.category,
        t.user.name,
        t.description || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    setAlert({
      type: 'success',
      message: 'Transactions exported successfully!',
      isVisible: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Alert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={() => setAlert(prev => ({ ...prev, isVisible: false }))}
      />
      
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-gray-400">Manage and analyze all your financial transactions.</p>
        </div>

        <TransactionFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExportCSV={handleExportCSV}
          onReset={handleReset}
        />

        <TransactionTable
          transactions={filteredAndSortedTransactions}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;