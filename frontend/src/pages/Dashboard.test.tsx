import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Page Tableau de bord', () => {
  test('affiche le titre principal', () => {
    render(<Dashboard />);
    expect(screen.getByText(/tableau de bord/i)).toBeInTheDocument();
  });

  test('navigation vers une section spécifique', () => {
    render(<Dashboard />);
    const link = screen.getByRole('link', { name: /documents récents/i });
    fireEvent.click(link);
    expect(screen.getByText(/documents récents/i)).toBeInTheDocument();
  });
});
