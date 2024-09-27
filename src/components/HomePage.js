import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'; // Reusing the Layout component for consistent UI
import QRCodeModal from './QRCodeModal'; // Import the renamed QRCodeModal
import { QRCodeCanvas } from 'qrcode.react'; // Updated import for Canvas QR code
import './HomePage.css'; // Add specific styling for the HomePage
import { useAuth } from '../context/AuthContext'; // Import the authentication context

const HomePage = () => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const { logout } = useAuth(); // Get the logout method from auth context
  const navigate = useNavigate();

  const handleShowQRCode = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    await logout(); // Call the logout method to clear the authentication state
    navigate('/sign-in'); // Redirect to sign-in page after logout
  };

  return (
    <Layout>
      <div className="home-container">
        <h1>Welcome to Your Home Page!</h1>
        <p>Congratulations! You are successfully verified and logged in.</p>
        <p>Here, you can access your account details, view your QR code, and explore other features.</p>
        <div className="actions">
          <button className="action-button" onClick={handleShowQRCode}>
            View QR Code
          </button>
          <button className="action-button">Account Settings</button>
        </div>

        {/* Use QRCodeModal */}
        <QRCodeModal show={showModal} onClose={handleCloseModal}>
          <QRCodeCanvas value="https://your-verified-link.com" size={250} />
          <p>Scan this QR code to verify your identity.</p>
        </QRCodeModal>

        {/* Add the Logout button */}
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </Layout>
  );
};

export default HomePage;
