import { useState, useEffect } from 'react';
import { User, Post, Todo } from '../types/api';

interface Analytics {
  totalUsers: number;
  mostPosts: { user: User; count: number } | null;
  fewestPosts: { user: User; count: number } | null;
  mostCompleted: { user: User; count: number } | null;
  fewestCompleted: { user: User; count: number } | null;
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()),
    ])
      .then(([users, posts, todos]: [User[], Post[], Todo[]]) => {
        const postCounts = new Map<number, number>();
        const completedCounts = new Map<number, number>();

        posts.forEach(post => {
          postCounts.set(post.userId, (postCounts.get(post.userId) || 0) + 1);
        });

        todos.forEach(todo => {
          if (todo.completed) {
            completedCounts.set(todo.userId, (completedCounts.get(todo.userId) || 0) + 1);
          }
        });

        let mostPosts = null;
        let fewestPosts = null;
        let mostCompleted = null;
        let fewestCompleted = null;

        users.forEach(user => {
          const postCount = postCounts.get(user.id) || 0;
          const completedCount = completedCounts.get(user.id) || 0;

          if (!mostPosts || postCount > mostPosts.count) {
            mostPosts = { user, count: postCount };
          }
          if (!fewestPosts || postCount < fewestPosts.count) {
            fewestPosts = { user, count: postCount };
          }
          if (!mostCompleted || completedCount > mostCompleted.count) {
            mostCompleted = { user, count: completedCount };
          }
          if (!fewestCompleted || completedCount < fewestCompleted.count) {
            fewestCompleted = { user, count: completedCount };
          }
        });

        setAnalytics({
          totalUsers: users.length,
          mostPosts,
          fewestPosts,
          mostCompleted,
          fewestCompleted,
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { analytics, loading, error };
}
