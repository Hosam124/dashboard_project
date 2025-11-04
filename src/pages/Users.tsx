import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Loader2 } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';

export default function Users() {
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-red-400 font-semibold">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-4 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Users
          </h1>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => navigate(`/dashboard/users/${user.id}`)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-600 opacity-10"></div>
              </div>

              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 group-hover:scale-110 transition-transform shadow-lg">
                    <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-cyan-300" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-bold text-white text-lg mb-1 truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-cyan-300 mb-1">@{user.username}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 truncate text-left font-light">
                  {user.email}
                </p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
