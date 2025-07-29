
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
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
import BookingCalendar from './pages/BookingCalendar';
import ReportListing from './pages/ReportListing';
import RentEstimator from './pages/RentEstimator';

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      {/* Flatmate preferences accessible to new users */}
      <Route path="/edit-flatmate-preferences" element={<FlatmateForm />} />
      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="/flat-listings" element={<ProtectedRoute><FlatListings /></ProtectedRoute>} />
      <Route path="/flats/:id" element={<ProtectedRoute><FlatDetails /></ProtectedRoute>} />
      <Route path="/find-flatmate" element={<ProtectedRoute><FindFlatmates /></ProtectedRoute>} />
      <Route path="/flatmate/:userId" element={<ProtectedRoute><FlatmateProfile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/booking-calendar" element={<ProtectedRoute><BookingCalendar /></ProtectedRoute>} />
      <Route path="/report-listing" element={<ProtectedRoute><ReportListing /></ProtectedRoute>} />
      <Route path="/rent-estimator" element={<ProtectedRoute><RentEstimator /></ProtectedRoute>} />
      {/* OAuth success must be public so it can set login state */}
      <Route path="/oauth-success" element={<OAuthSuccess />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
