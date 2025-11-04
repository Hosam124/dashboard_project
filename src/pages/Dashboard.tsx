import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, FileText, BarChart3, Cloud, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cards = [
    {
      title: 'User & Posts Manager',
      description: 'Browse users and manage their posts and todos',
      icon: Users,
      path: '/dashboard/users',
      gradient: 'from-cyan-600 to-blue-600',
      bgGlow: 'from-cyan-500/10 to-blue-500/10',
      accentColor: 'cyan',
    },
    {
      title: 'Note Manager',
      description: 'Create and organize notes by priority',
      icon: FileText,
      path: '/dashboard/notes',
      gradient: 'from-purple-600 to-pink-600',
      bgGlow: 'from-purple-500/10 to-pink-500/10',
      accentColor: 'purple',
    },
    {
      title: 'Simple Analytics',
      description: 'View statistics and insights from user data',
      icon: BarChart3,
      path: '/dashboard/analytics',
      gradient: 'from-orange-500 to-red-600',
      bgGlow: 'from-orange-500/10 to-red-500/10',
      accentColor: 'orange',
    },
    {
      title: 'Weather Widget',
      description: 'Check real-time weather for any city',
      icon: Cloud,
      path: '/dashboard/weather',
      gradient: 'from-sky-500 to-cyan-600',
      bgGlow: 'from-sky-500/10 to-cyan-500/10',
      accentColor: 'sky',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all font-semibold shadow-lg hover:shadow-xl hover:shadow-red-500/50 transform hover:-translate-y-1"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-white mb-2">
            Welcome back!
          </h2>
          <p className="text-lg text-gray-300 font-light">
            Select a feature to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGlow}`}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20`}></div>
                </div>

                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 text-left">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-left font-light leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-cyan-300 font-semibold group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
