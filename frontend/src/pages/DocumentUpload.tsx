import React, { useState } from 'react';

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Veuillez sélectionner un fichier avant de télécharger.');
      return;
    }

    // Placeholder for actual upload logic
    setUploadStatus('Fonction de téléchargement en cours de développement...');
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6">Télécharger un document</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Télécharger
      </button>
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default DocumentUpload;
