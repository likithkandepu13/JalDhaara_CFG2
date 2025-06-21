// Authentication Context
// This provides authentication state management across the entire app
// It's optional but recommended for larger applications

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Create authentication context
const AuthContext = createContext();

// Custom hook to use authentication context
// This makes it easy to access auth state from any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication Provider Component
// Wrap your app with this to provide auth state to all components
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
  const [loading, setLoading] = useState(true); // Loading state while checking auth

  useEffect(() => {
    // Listen for authentication state changes
    // This fires whenever user logs in or out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user (null if logged out)
      setLoading(false); // Stop loading once we know the auth state
      
      if (user) {
        console.log('User is logged in:', user.email);
      } else {
        console.log('User is logged out');
      }
    });

    // Cleanup function to unsubscribe when component unmounts
    return unsubscribe;
  }, []);

  // Values provided to components using this context
  const value = {
    currentUser,    // Current authenticated user
    loading,        // Whether we're still checking authentication state
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  );
};
