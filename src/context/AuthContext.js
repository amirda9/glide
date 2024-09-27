import React, { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signOut, getCurrentUser } from '../api/mockApi'; // Import mock API methods

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap around parts of your app that need access to the authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize the auth state by checking if the user is already authenticated
  useEffect(() => {
    const initializeAuth = async () => {
      const response = await getCurrentUser();
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
      }
    };
    initializeAuth();
  }, []);

  // Method to log in the user
  const login = async ({ email, password }) => {

    try {
      const response = await signIn({ email, password });
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
        localStorage.setItem('authenticatedUser', JSON.stringify(response.user)); // Save user to localStorage
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Method to log out the user
  const logout = async () => {
    await signOut();
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authenticatedUser'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
