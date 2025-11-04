import { useState, useEffect } from 'react';
import { User, Post, Todo } from '../types/api';

export function useUserDetails(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(res => res.json()),
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(res => res.json()),
    ])
      .then(([userData, postsData, todosData]) => {
        setUser(userData);
        setPosts(postsData);
        setTodos(todosData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return { user, posts, todos, loading, error };
}
