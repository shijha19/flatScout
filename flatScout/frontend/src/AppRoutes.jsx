
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';



import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import FlatListings from './pages/FlatListings';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="/flat-listings" element={<FlatListings />} />
  </Routes>
);

export default AppRoutes;
