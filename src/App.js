// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkValidator from './components/LinkValidator';
import WelcomePage from './components/WelcomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route for the link validator */}
        <Route path="/" element={<LinkValidator />} />
        
        {/* Dynamic linkId route */}
        <Route path="/:linkId" element={<LinkValidator />} />

        {/* Welcome page route */}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Catch-all route for any other paths to direct to link validator */}
        <Route path="*" element={<LinkValidator />} />
      </Routes>
    </Router>
  );
}

export default App;
