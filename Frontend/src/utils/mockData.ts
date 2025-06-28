import { Transaction, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Matheus Ferreira',
    email: 'matheus@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    name: 'Floyd Miles',
    email: 'floyd@example.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '3',
    name: 'Jerome Bell',
    email: 'jerome@example.com',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const generateMockTransactions = (count: number = 50): Transaction[] => {
  const categories = ['Salary', 'Freelance', 'Office', 'Food', 'Utilities', 'Investment', 'Shopping', 'Transportation'];
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
  const types: ('income' | 'expense')[] = ['income', 'expense'];

  return Array.from({ length: count }, (_, index) => {
    const type = Math.random() > 0.3 ? 'expense' : 'income';
    const amount = Math.floor(Math.random() * 5000) + 50;
    const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    return {
      id: (index + 1).toString(),
      name: `Transaction ${index + 1}`,
      amount,
      date: date.toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type,
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `${type === 'income' ? 'Income' : 'Expense'} transaction ${index + 1}`,
      user: mockUsers[Math.floor(Math.random() * mockUsers.length)]
    };
  });
};