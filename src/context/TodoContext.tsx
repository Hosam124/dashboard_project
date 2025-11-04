import { createContext, useContext, useState, ReactNode } from 'react';

interface TodoContextType {
  completedTodos: Set<number>;
  toggleTodo: (todoId: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [completedTodos, setCompletedTodos] = useState<Set<number>>(new Set());

  const toggleTodo = (todoId: number) => {
    setCompletedTodos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(todoId)) {
        newSet.delete(todoId);
      } else {
        newSet.add(todoId);
      }
      return newSet;
    });
  };

  return (
    <TodoContext.Provider value={{ completedTodos, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoState must be used within TodoProvider');
  }
  return context;
}
