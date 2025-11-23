import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';

describe('Page Recherche avancée', () => {
  test('affiche le champ de recherche', () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText(/recherche/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('permet d\'entrer un terme de recherche', () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText(/recherche/i);
    fireEvent.change(searchInput, { target: { value: 'rapport' } });
    expect(searchInput).toHaveValue('rapport');
  });

  test('affiche les résultats après une recherche', async () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText(/recherche/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      const results = screen.getByTestId('search-results');
      expect(results).toBeInTheDocument();
      expect(results.children.length).toBeGreaterThan(0);
    });
  });

  test('affiche un message d\'erreur si la recherche échoue', async () => {
    // On peut mocker une erreur API ici
    const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Erreur réseau'))
    );
    render(<Search />);
    const searchInput = screen.getByPlaceholderText(/recherche/i);
    fireEvent.change(searchInput, { target: { value: 'fail' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      const errorMessage = screen.getByText(/erreur lors de la recherche/i);
      expect(errorMessage).toBeInTheDocument();
    });

    fetchMock.mockRestore();
  });
});
