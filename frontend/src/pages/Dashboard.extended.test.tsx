import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Tests approfondis de la Page Tableau de bord', () => {
  test('affiche les statistiques principales et navigation', () => {
    render(<Dashboard />);
    expect(screen.getByText(/statistiques/i)).toBeInTheDocument();
    expect(screen.getByText(/utilisateurs actifs/i)).toBeInTheDocument();

    // Simule clic sur un tableau de statistiques
    fireEvent.click(screen.getByText(/utilisateurs actifs/i));
    expect(screen.getByText(/détails des utilisateurs/i)).toBeInTheDocument();
  });

  test('vérifie les notifications visibles', () => {
    render(<Dashboard />);
    const notifications = screen.getByTestId('notifications');
    expect(notifications).toBeInTheDocument();
    expect(notifications.children.length).toBeGreaterThan(0);
  });

  test('vérifie le comportement lors du clic sur notification', async () => {
    render(<Dashboard />);
    const notificationItem = screen.getByTestId('notification-item-0');
    fireEvent.click(notificationItem);

    await waitFor(() => {
      expect(screen.getByText(/notification marquée comme lue/i)).toBeInTheDocument();
    });
  });
});
