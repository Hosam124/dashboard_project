import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, CheckCircle, Loader2, BarChart3 } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Analytics() {
  const navigate = useNavigate();
  const { analytics, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-orange-400 animate-spin" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-red-400 font-semibold">Error loading analytics</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
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
          <h1 className="text-4xl font-black bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent">
            Simple Analytics
          </h1>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 bg-gradient-to-br from-orange-500/10 to-red-500/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-orange-300" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Total Users</p>
              <p className="text-5xl font-black bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent">
                {analytics.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Post Statistics</h2>
            </div>

            {analytics.mostPosts && (
              <div className="mb-6 p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl">
                <p className="text-emerald-300 text-sm font-semibold mb-2">Most Posts</p>
                <p className="text-3xl font-black text-emerald-200 mb-1">
                  {analytics.mostPosts.user.username}
                </p>
                <p className="text-sm text-emerald-300 font-medium">
                  {analytics.mostPosts.count} posts
                </p>
              </div>
            )}

            {analytics.fewestPosts && (
              <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl">
                <p className="text-yellow-300 text-sm font-semibold mb-2">Fewest Posts</p>
                <p className="text-3xl font-black text-yellow-200 mb-1">
                  {analytics.fewestPosts.user.username}
                </p>
                <p className="text-sm text-yellow-300 font-medium">
                  {analytics.fewestPosts.count} posts
                </p>
              </div>
            )}
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Todo Statistics</h2>
            </div>

            {analytics.mostCompleted && (
              <div className="mb-6 p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl">
                <p className="text-emerald-300 text-sm font-semibold mb-2">Most Completed</p>
                <p className="text-3xl font-black text-emerald-200 mb-1">
                  {analytics.mostCompleted.user.username}
                </p>
                <p className="text-sm text-emerald-300 font-medium">
                  {analytics.mostCompleted.count} completed todos
                </p>
              </div>
            )}

            {analytics.fewestCompleted && (
              <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl">
                <p className="text-yellow-300 text-sm font-semibold mb-2">Fewest Completed</p>
                <p className="text-3xl font-black text-yellow-200 mb-1">
                  {analytics.fewestCompleted.user.username}
                </p>
                <p className="text-sm text-yellow-300 font-medium">
                  {analytics.fewestCompleted.count} completed todos
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
