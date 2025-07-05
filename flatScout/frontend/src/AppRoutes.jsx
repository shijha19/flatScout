import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import FindFlatmates from './components/FindFlatmates';
import FlatmateForm from './components/FlatmateForm';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/find-flatmate" element={<FindFlatmates />} />
    <Route path="/edit-flatmate-preferences" element={<FlatmateForm />} />
  </Routes>
);

export default AppRoutes;
