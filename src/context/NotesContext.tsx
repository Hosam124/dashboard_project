import { createContext, useContext, useState, ReactNode } from 'react';

export type Priority = 'important' | 'normal' | 'delayed';

export interface Note {
  id: string;
  text: string;
  priority: Priority;
}

interface NotesContextType {
  notes: Note[];
  addNote: (text: string, priority: Priority) => void;
  deleteNote: (id: string) => void;
  changePriority: (id: string, priority: Priority) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (text: string, priority: Priority) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      priority,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const changePriority = (id: string, priority: Priority) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, priority } : note
    ));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, changePriority }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
}
