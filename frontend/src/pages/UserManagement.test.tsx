import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserManagement from './UserManagement';

describe('Page Gestion des utilisateurs', () => {
  test('affiche la liste des utilisateurs', async () => {
    render(<UserManagement />);
    expect(screen.getByText(/gestion des utilisateurs/i)).toBeInTheDocument();

    // Simule chargement des utilisateurs
    const userRows = await screen.findAllByRole('row');
    expect(userRows.length).toBeGreaterThan(0);
  });

  test('permet d\'ajouter un utilisateur', async () => {
    render(<UserManagement />);
    fireEvent.click(screen.getByRole('button', { name: /ajouter utilisateur/i }));

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), { target: { value: 'nouveluser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'nouveluser@example.com' } });
    fireEvent.change(screen.getByLabelText(/rôle/i), { target: { value: 'user' } });

    fireEvent.click(screen.getByRole('button', { name: /soumettre/i }));

    await waitFor(() => {
      expect(screen.getByText(/utilisateur ajouté avec succès/i)).toBeInTheDocument();
    });
  });

  test('permet de supprimer un utilisateur', async () => {
    render(<UserManagement />);
    const userRow = await screen.findByText(/utilisateurtest/i);
    fireEvent.click(userRow);
    fireEvent.click(screen.getByRole('button', { name: /supprimer/i }));

    await waitFor(() => {
      expect(screen.getByText(/utilisateur supprimé avec succès/i)).toBeInTheDocument();
    });
  });
});
