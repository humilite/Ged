import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    // Placeholder: Add real search logic here to query backend or data source
    setResults([]);
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6">Recherche de documents</h2>
      <input
        type="text"
        placeholder="Entrez un terme de recherche"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Rechercher
      </button>
      <div className="mt-6">
        {results.length === 0 ? (
          <p>Aucun résultat à afficher.</p>
        ) : (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{JSON.stringify(result)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
