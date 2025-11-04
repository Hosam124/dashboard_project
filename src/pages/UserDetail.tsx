import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Mail, Phone, Globe, Building, MapPin } from 'lucide-react';
import { useUserDetails } from '../hooks/useUserDetails';
import { useTodoState } from '../context/TodoContext';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, posts, todos, loading, error } = useUserDetails(id!);
  const { completedTodos, toggleTodo } = useTodoState();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-red-400 font-semibold">Error loading user details</div>
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
            onClick={() => navigate('/dashboard/users')}
            className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-4 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Users</span>
          </button>
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {user.name}
          </h1>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300 font-medium">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300 font-medium">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300 font-medium">{user.website}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Building className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300 font-medium">{user.company.name}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300 font-medium">{user.address.city}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Posts ({posts.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {posts.map(post => (
                <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-cyan-300 mb-2 capitalize">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {post.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Todos ({todos.length})
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {todos.map(todo => {
                const isCompleted = completedTodos.has(todo.id);
                return (
                  <button
                    key={todo.id}
                    onClick={() => toggleTodo(todo.id)}
                    className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 text-cyan-500 rounded-lg"
                      />
                      <span
                        className={`flex-1 text-sm font-medium ${
                          isCompleted
                            ? 'line-through text-cyan-400'
                            : 'text-gray-300'
                        }`}
                      >
                        {todo.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
