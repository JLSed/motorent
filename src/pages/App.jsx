import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import LoginPage from './LoginPage.jsx'; // Assuming this is your login page component
import SignUpPage from './SignUpPage.jsx';
import HomePage from './HomePage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />  {/* Login Page */}
      <Route path="/signup" element={<SignUpPage />} />    {/* Home Page */}
      <Route path="/home" element={<HomePage />} />    {/* Home Page */}
    </Routes>
  );
};

export default App;