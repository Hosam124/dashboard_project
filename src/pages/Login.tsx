import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-slate-900 p-4 rounded-2xl">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-black text-center mb-3 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-center text-gray-300 mb-10 font-light">
            Step into your personal dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Username</span>
                </div>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </div>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-5 py-3.5 rounded-2xl text-sm font-medium backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3.5 rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/20">
          </div>
        </div>
      </div>
    </div>
  );
}
