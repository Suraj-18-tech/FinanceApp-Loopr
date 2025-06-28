import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import Sidebar from '../components/navigation/Sidebar';
import StatsCard from '../components/dashboard/StatsCard';
import LineChart from '../components/charts/LineChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { Transaction, DashboardStats, ChartDataPoint } from '../types';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalTransactions: 0
  });

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockStats: DashboardStats = {
      totalBalance: 41210,
      totalIncome: 67890,
      totalExpenses: 26680,
      totalTransactions: 156
    };

    const mockTransactions: Transaction[] = [
      {
        id: '1',
        name: 'Salary Payment',
        amount: 5000,
        date: 'Apr 20, 2020',
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
        date: 'Apr 18, 2020',
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
        date: 'Apr 17, 2020',
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
      }
    ];

    const mockChartData: ChartDataPoint[] = [
      { date: '2024-01', value: 35000 },
      { date: '2024-02', value: 42000 },
      { date: '2024-03', value: 38000 },
      { date: '2024-04', value: 45000 },
      { date: '2024-05', value: 41000 },
      { date: '2024-06', value: 48000 },
      { date: '2024-07', value: 52000 },
      { date: '2024-08', value: 49000 },
      { date: '2024-09', value: 55000 },
      { date: '2024-10', value: 58000 },
      { date: '2024-11', value: 54000 },
      { date: '2024-12', value: 61000 }
    ];

    setStats(mockStats);
    setRecentTransactions(mockTransactions);
    setChartData(mockChartData);
  }, []);

  const handleViewAllTransactions = () => {
    navigate('/transactions');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Balance"
            value={`$${stats.totalBalance.toLocaleString()}`}
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
            color="bg-green-500/20 text-green-400"
          />
          <StatsCard
            title="Total Income"
            value={`$${stats.totalIncome.toLocaleString()}`}
            change="+8.2% from last month"
            changeType="positive"
            icon={TrendingUp}
            color="bg-blue-500/20 text-blue-400"
          />
          <StatsCard
            title="Total Expenses"
            value={`$${stats.totalExpenses.toLocaleString()}`}
            change="-3.1% from last month"
            changeType="positive"
            icon={TrendingDown}
            color="bg-purple-500/20 text-purple-400"
          />
          <StatsCard
            title="Transactions"
            value={stats.totalTransactions.toString()}
            change="+15.8% from last month"
            changeType="positive"
            icon={CreditCard}
            color="bg-orange-500/20 text-orange-400"
          />
        </div>

        {/* Chart and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Financial Overview</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Income</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Expenses</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <LineChart data={chartData} color="#10b981" />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-1">
            <RecentTransactions
              transactions={recentTransactions}
              onViewAll={handleViewAllTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;