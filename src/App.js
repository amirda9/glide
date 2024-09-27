// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkValidator from './components/LinkValidator';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />

          {/* Link validator with dynamic linkId parameter */}
          <Route path="/validate-link/:linkId" element={<LinkValidator />} />

          {/* Welcome page route */}
          <Route path="/welcome" element={<ProtectedRoute element={<WelcomePage />} />} />

          {/* Sign-in page route */}
          <Route path="/sign-in" element={<SignInPage />} />

          {/* Catch-all route for any other paths */}
          <Route path="*" element={<ProtectedRoute element={<HomePage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
