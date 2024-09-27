// src/components/Layout.js
import React from 'react';
import './Layout.css'; // Import the common layout styles
import logo from '../assets/logo.png'; // Import the logo image

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      {/* Logo positioned outside the main container with padding */}
      <img src={logo} alt="Glide Logo" className="logo" />
      
      {/* Main content container */}
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
