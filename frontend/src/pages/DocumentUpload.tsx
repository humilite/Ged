import React, { useState } from 'react';

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }
    // Ici ajoutez la logique d'upload au backend
    alert(`Fichier à uploader: ${file.name}`);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Déposer un document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
