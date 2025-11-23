const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erreur inconnue');
  }

  return response.json();
}

// Auth APIs
export async function loginUser(email: string, password: string) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usernameOrEmail: email, password }),
  });
}

// Additional API calls can be added here following the same pattern

export default {
  loginUser,
};
