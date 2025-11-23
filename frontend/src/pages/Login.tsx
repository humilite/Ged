import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userData = await apiClient.loginUser(email, password);
      login(userData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-6">Connexion</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className="block mb-2 font-semibold" htmlFor="password">Mot de passe</label>
        <input
          className="w-full p-2 mb-6 border rounded"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
