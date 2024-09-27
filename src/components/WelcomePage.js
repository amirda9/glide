// src/components/WelcomePage.js
import React, { useState } from 'react';
import './WelcomePage.css'; // Import the specific CSS for WelcomePage
import logo from '../assets/logo.png'; // Import the logo image

const WelcomePage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container welcome-page">
      {/* Logo at the top */}
      <img src={logo} alt="Glide Logo" className="logo" />

      <h1>Welcome to Glide!</h1>
      <p>Please upload your picture below:</p>
      <input type="file" accept="image/*" onChange={handleImageChange} className="upload-input" />
      {imagePreview && (
        <div className="image-preview">
          <h3>Preview:</h3>
          <img src={imagePreview} alt="Preview" className="preview-img" />
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
