import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/mockApi'; // Ensure this is imported correctly
import Layout from './Layout'; // Assuming Layout is your common layout component
import './SignInPage.css'; // Import the provided CSS for styling
import { useAuth } from '../context/AuthContext'; // Import the auth context

const SignInPage = () => {
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(''); // Error state
  const [success, setSuccess] = useState(false); // Success state
  const { isAuthenticated } = useAuth(); // Get authentication status from auth context
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Redirect to home if already authenticated
    }
  }, [isAuthenticated, navigate]); // Dependency array includes isAuthenticated and navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password }); // Use the modified sign-in API method
      if (response.success) {
        setSuccess(true); // Set success state
        setError(''); // Clear errors
        setTimeout(() => {
          navigate('/home'); // Redirect to home page after 2 seconds
        }, 2000);
      } else {
        setError(response.message || 'Sign-in failed. Please try again.');
      }
    } catch (err) {
      setError('Sign-in failed. Please try again later.');
    }
  };

  return (
    <Layout>
      {!success ? (
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
            <button type="submit" className="submit-button">Sign In</button>
          </form>
        </div>
      ) : (
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
