import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'; // Assuming Layout is your common layout component
import './SignInPage.css'; // Import the provided CSS for styling
import { useAuth } from '../context/AuthContext'; // Import the auth context

const SignInPage = () => {
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(''); // Error state
  const [loading, setLoading] = useState(false); // Loading state to manage async operation
  const [success, setSuccess] = useState(false); // Success state for animation
  const { isAuthenticated, login } = useAuth(); // Get authentication status and login function from auth context
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Redirect to home if already authenticated
    }
  }, [isAuthenticated, navigate]); // Dependency array includes isAuthenticated and navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password }); // Use the login method from auth context
      setSuccess(true); // Set success state to true to trigger the animation
      setError(''); // Clear any previous errors
      setLoading(false); // Stop loading state

      setTimeout(() => {
        navigate('/home'); // Redirect to home page after a delay
      }, 2000); // 2-second delay to show success animation
    } catch (err) {
      setError(err.message || 'Sign-in failed. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      {!success ? ( // Show form if not successful
        <div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="verification-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      ) : ( // Show success animation if successful
        <div className="success-message">
          <div className="checkmark">✔️</div>
          <h1>Sign-In Successful!</h1>
          <p>Redirecting you to the home page...</p>
        </div>
      )}
    </Layout>
  );
};

export default SignInPage;
