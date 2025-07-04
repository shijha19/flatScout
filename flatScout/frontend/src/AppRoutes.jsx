import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);

export default AppRoutes;
