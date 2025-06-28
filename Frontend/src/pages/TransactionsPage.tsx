import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
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
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/transactions');
        const raw = res.data.data || res.data;

        const formatted: Transaction[] = raw.map((t: any) => ({
          id: t.id,
          name: t.category || 'Transaction',
          amount: parseFloat(t.amount),
          date: t.date,
          status: t.status || 'completed',
          type: t.type,
          category: t.category,
          description: t.description || '',
          user: {
            id: 'system',
            name: 'System User',
            email: 'system@example.com',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=User'
          }
        }));

        setTransactions(formatted);
      } catch (err) {
        console.error(err);
        setAlert({
          type: 'error',
          message: 'Failed to load transactions.',
          isVisible: true
        });
      }
    };

    fetchTransactions();
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
