import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de recherche, vous pouvez appeler API backend ici
    if (query.trim() !== '') {
      setResults([
        `Résultat 1 pour "${query}"`,
        `Résultat 2 pour "${query}"`,
        `Résultat 3 pour "${query}"`,
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Recherche avancée</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          className="w-full p-3 border rounded"
          placeholder="Entrez vos critères de recherche"
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Rechercher
        </button>
      </form>
      <div>
        {results.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {results.map((res, idx) => (
              <li key={idx}>{res}</li>
            ))}
          </ul>
        ) : (
          <p>Aucun résultat</p>
        )}
      </div>
    </div>
  );
};

export default Search;
