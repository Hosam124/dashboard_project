import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Sparkles } from 'lucide-react';
import { useNotes, Priority } from '../context/NotesContext';

export default function Notes() {
  const navigate = useNavigate();
  const { notes, addNote, deleteNote, changePriority } = useNotes();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text.trim(), priority);
      setText('');
      setPriority('normal');
    }
  };

  const notesByPriority = {
    important: notes.filter(n => n.priority === 'important'),
    normal: notes.filter(n => n.priority === 'normal'),
    delayed: notes.filter(n => n.priority === 'delayed'),
  };

  const priorityConfig = {
    important: {
      title: 'Important',
      gradient: 'from-red-600 to-pink-600',
      bgGlow: 'from-red-500/10 to-pink-500/10',
      textColor: 'text-red-300',
    },
    normal: {
      title: 'Normal',
      gradient: 'from-purple-600 to-blue-600',
      bgGlow: 'from-purple-500/10 to-blue-500/10',
      textColor: 'text-purple-300',
    },
    delayed: {
      title: 'Delayed',
      gradient: 'from-yellow-500 to-orange-600',
      bgGlow: 'from-yellow-500/10 to-orange-500/10',
      textColor: 'text-yellow-300',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
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
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            Note Manager
          </h1>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Add New Note</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-white placeholder-gray-400"
                rows={3}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="px-5 py-3 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white font-medium"
              >
                <option value="important">Important</option>
                <option value="normal">Normal</option>
                <option value="delayed">Delayed</option>
              </select>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>Add Note</span>
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(Object.keys(priorityConfig) as Priority[]).map(priorityKey => {
            const config = priorityConfig[priorityKey];
            const priorityNotes = notesByPriority[priorityKey];

            return (
              <div key={priorityKey} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGlow}`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      {config.title}
                    </h3>
                    <span className={`px-3 py-1.5 rounded-xl text-sm font-bold bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
                      {priorityNotes.length}
                    </span>
                  </div>

                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {priorityNotes.map(note => (
                      <div
                        key={note.id}
                        className="bg-white/5 border border-white/20 rounded-2xl p-4 hover:bg-white/10 transition-all group"
                      >
                        <p className="text-gray-200 mb-3 break-words text-sm leading-relaxed">{note.text}</p>
                        <div className="flex items-center gap-2">
                          <select
                            value={note.priority}
                            onChange={(e) => changePriority(note.id, e.target.value as Priority)}
                            className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                          >
                            <option value="important">Important</option>
                            <option value="normal">Normal</option>
                            <option value="delayed">Delayed</option>
                          </select>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {priorityNotes.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-8 font-light">
                        No {config.title.toLowerCase()} notes yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
