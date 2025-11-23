import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';

describe('Page Profil Utilisateur', () => {
  test('affiche les informations du profil', () => {
    render(<Profile />);
    expect(screen.getByText(/mon profil/i)).toBeInTheDocument();

    const nameField = screen.getByLabelText(/nom/i);
    expect(nameField).toBeInTheDocument();
  });

  test('permet de modifier et sauvegarder le profil', async () => {
    render(<Profile />);
    const nameInput = screen.getByLabelText(/nom/i);
    fireEvent.change(nameInput, { target: { value: 'Nouvel Nom' } });

    fireEvent.click(screen.getByRole('button', { name: /sauvegarder/i }));

    await waitFor(() => {
      expect(screen.getByText(/profil mis à jour avec succès/i)).toBeInTheDocument();
    });
  });
});
