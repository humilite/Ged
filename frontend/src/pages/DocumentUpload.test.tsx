import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DocumentUpload from './DocumentUpload';

describe('Page Dépôt de documents', () => {
  test('affiche le formulaire de dépôt', () => {
    render(<DocumentUpload />);
    expect(screen.getByText(/dépôt de documents/i)).toBeInTheDocument();

    // Vérifie la présence du bouton d’envoi
    const uploadButton = screen.getByRole('button', { name: /envoyer/i });
    expect(uploadButton).toBeInTheDocument();
  });

  test('permet de sélectionner un fichier', () => {
    render(<DocumentUpload />);
    const fileInput = screen.getByLabelText(/sélectionner un fichier/i) as HTMLInputElement;
    const file = new File(['dummy content'], 'testfile.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files![0]).toStrictEqual(file);
  });

  test('bloque l’envoi si aucun fichier sélectionné', () => {
    render(<DocumentUpload />);
    const uploadButton = screen.getByRole('button', { name: /envoyer/i });

    fireEvent.click(uploadButton); // Pas de fichier sélectionné
    expect(screen.getByText(/aucun fichier sélectionné/i)).toBeInTheDocument();
  });

  test('permet l’envoi du fichier sélectionné', async () => {
    render(<DocumentUpload />);
    const fileInput = screen.getByLabelText(/sélectionner un fichier/i);
    const uploadButton = screen.getByRole('button', { name: /envoyer/i });
    const file = new File(['dummy content'], 'testfile.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/fichier envoyé avec succès/i)).toBeInTheDocument();
    });
  });
});
