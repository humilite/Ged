  // Ajoutez ici d'autres méthodes API si nécessaire, par ex. fetchDocuments, uploadDocument, etc.
};

export default apiClient;
=======
  },

  // Droits d'accès
  getUserAccessRights: async (userId: string, documentId: string) => {
    const response = await fetch(`${BASE_URL}/droits-acces/user/${userId}/document/${documentId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  },
  upsertAccessRights: async (data: { userId: string; documentId: string; access_level: string }) => {
    const response = await fetch(`${BASE_URL}/droits-acces`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse(response);
  },
  deleteAccessRights: async (userId: string, documentId: string) => {
    const response = await fetch(`${BASE_URL}/droits-acces/user/${userId}/document/${documentId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Historique des actions
  getUserActions: async (userId: string) => {
    const response = await fetch(`${BASE_URL}/historique-actions/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  logAction: async (data: { userId: string; action: string; target_type?: string; target_id?: number }) => {
    const response = await fetch(`${BASE_URL}/historique-actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Métadonnées
  getDocumentMetadata: async (documentId: string) => {
    const response = await fetch(`${BASE_URL}/metadonnees/document/${documentId}`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  createMetadata: async (data: { document_id: string; key: string; value: string }) => {
    const response = await fetch(`${BASE_URL}/metadonnees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  updateMetadata: async (id: string, data: { key: string; value: string }) => {
    const response = await fetch(`${BASE_URL}/metadonnees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  deleteMetadata: async (id: string) => {
    const response = await fetch(`${BASE_URL}/metadonnees/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Ajoutez ici d'autres méthodes API si nécessaire, par ex. fetchDocuments, uploadDocument, etc.
};

export default apiClient;
