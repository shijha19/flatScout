
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import FindFlatmates from './components/FindFlatmates';
import FlatmateForm from './components/FlatmateForm';



import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import FlatListings from './pages/FlatListings';
import OAuthSuccess from './pages/OAuthSuccess';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="/flat-listings" element={<FlatListings />} />
    <Route path="/find-flatmate" element={<FindFlatmates />} />
    <Route path="/edit-flatmate-preferences" element={<FlatmateForm />} />
    <Route path="/oauth-success" element={<OAuthSuccess />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
