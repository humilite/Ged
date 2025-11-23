import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  created_at: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For demo, get notifications for userId = 1, replace with auth context userId in real app
    apiClient.getUserNotifications?.(1)
      .then(setNotifications)
      .catch(() => setError('Erreur lors du chargement des notifications'));
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await apiClient.markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      setError('Erreur lors de la mise à jour de la notification');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`mb-2 p-2 border rounded ${
              notification.isRead ? 'bg-gray-200' : 'bg-white'
            }`}
          >
            <div>{notification.message}</div>
            {!notification.isRead && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="mt-1 px-2 py-1 bg-blue-600 text-white rounded"
              >
                Marquer comme lu
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
