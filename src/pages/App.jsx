import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import LoginPage from './LoginPage.jsx'; // Assuming this is your login page component
import SignUpPage from './SignUpPage.jsx';
import HomePage from './HomePage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import UnitsPage from './UnitsPage.jsx';
import RentalLogPage from './RentalLogPage.jsx';
import EarningPage from './EarningPage.jsx';
import SettingsPage from './SettingsPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/units"
        element={
          <ProtectedRoute>
            <UnitsPage />
          </ProtectedRoute>
        }
      />
            <Route
        path="/rental-log"
        element={
          <ProtectedRoute>
            <RentalLogPage />
          </ProtectedRoute>
        }
      />
            <Route
        path="/earnings"
        element={
          <ProtectedRoute>
            <EarningPage />
          </ProtectedRoute>
        }
      />
            <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};


export default App;