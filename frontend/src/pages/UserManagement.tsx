import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulation fetch d'utilisateurs, à remplacer par appel backend
    setUsers([
      { id: 1, name: 'Alice Dupont', email: 'alice@example.com', role: 'admin' },
      { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'user' },
      { id: 3, name: 'Claire Durant', email: 'claire@example.com', role: 'user' },
    ]);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestion des utilisateurs</h1>
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Nom</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Rôle</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {/* Actions à implémenter */}
                <button className="text-blue-600 hover:underline mr-2">Modifier</button>
                <button className="text-red-600 hover:underline">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
