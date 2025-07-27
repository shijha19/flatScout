
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import App from './components/App';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import FindFlatmates from './components/FindFlatmates';
import FlatmateForm from './components/FlatmateForm';



import Profile from './pages/Profile';
import FlatDetails from './pages/FlatDetails';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import FlatListings from './pages/FlatListings';
import OAuthSuccess from './pages/OAuthSuccess';
import Dashboard from './pages/Dashboard';
import FlatmateProfile from './pages/FlatmateProfile';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<Signup />} />
    {/* Protected Routes */}
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
    <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
    <Route path="/flat-listings" element={<ProtectedRoute><FlatListings /></ProtectedRoute>} />
    <Route path="/flats/:id" element={<ProtectedRoute><FlatDetails /></ProtectedRoute>} />
    <Route path="/find-flatmate" element={<ProtectedRoute><FindFlatmates /></ProtectedRoute>} />
    <Route path="/flatmate/:userId" element={<ProtectedRoute><FlatmateProfile /></ProtectedRoute>} />
    <Route path="/edit-flatmate-preferences" element={<ProtectedRoute><FlatmateForm /></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    {/* OAuth success must be public so it can set login state */}
    <Route path="/oauth-success" element={<OAuthSuccess />} />
  </Routes>
);

export default AppRoutes;
