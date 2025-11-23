import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import DocumentUpload from './pages/DocumentUpload';
import Search from './pages/Search';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<DocumentUpload />} />
        <Route path="/search" element={<Search />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
