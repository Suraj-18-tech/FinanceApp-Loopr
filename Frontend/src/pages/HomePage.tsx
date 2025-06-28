import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Shield, Download } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: 'Interactive Dashboard',
      description: 'Visualize your financial data with beautiful charts and real-time analytics.'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your spending patterns and financial trends.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your financial data is protected with enterprise-grade security.'
    },
    {
      icon: Download,
      title: 'Export Data',
      description: 'Download your transaction data in CSV format for external analysis.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-white">FinanceApp</span>
            </div>
            <div className="space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> Financial </span>
              Future
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Powerful analytics, intuitive dashboards, and comprehensive transaction management 
              to help you make informed financial decisions and achieve your goals.
            </p>
            <div className="space-x-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/signup')}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="text-lg px-8 py-4"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/login')}
                className="text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Everything You Need to Manage Your Finances
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Financial Management?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of users who have already taken control of their finances with our platform.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/signup')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg px-10 py-4"
            >
              Start Your Journey
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;