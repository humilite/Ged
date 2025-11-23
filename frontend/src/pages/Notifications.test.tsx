import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Notifications from './Notifications';

const mockNotifications = [
  { id: 1, message: 'Notification 1', isRead: false, created_at: '2024-01-01T00:00:00Z' },
  { id: 2, message: 'Notification 2', isRead: true, created_at: '2024-01-02T00:00:00Z' },
];

// Mock the apiClient
jest.mock('../api/apiClient', () => ({
  getUserNotifications: jest.fn(() => Promise.resolve(mockNotifications)),
  markNotificationAsRead: jest.fn(() => Promise.resolve()),
}));

describe('Notifications Page', () => {
  it('affiche la liste des notifications', async () => {
    render(<Notifications />);
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Notification 1')).toBeInTheDocument();
      expect(screen.getByText('Notification 2')).toBeInTheDocument();
    });
  });

  it('permet de marquer une notification comme lue', async () => {
    const { getUserNotifications, markNotificationAsRead } = require('../api/apiClient');

    render(<Notifications />);
    await waitFor(() => screen.getByText('Notification 1'));

    const markAsReadButton = screen.getByText('Marquer comme lu');
    fireEvent.click(markAsReadButton);

    await waitFor(() => {
      expect(markNotificationAsRead).toHaveBeenCalledWith(1);
    });

    // After marking as read, button should disappear
    await waitFor(() => {
      expect(screen.queryByText('Marquer comme lu')).not.toBeInTheDocument();
    });
  });
});
