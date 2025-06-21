// Login Component
// This component handles user authentication with email/password and Google sign-in

import React, { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from '../firebase/auth';
import './common.css'; // We'll create this CSS file for styling

const Login = () => {
  // State variables to manage form data and UI state
  const [email, setEmail] = useState(''); // Stores email input
  const [password, setPassword] = useState(''); // Stores password input
  const [loading, setLoading] = useState(false); // Shows loading state during authentication
  const [error, setError] = useState(''); // Stores error messages
  const [user, setUser] = useState(null); // Stores logged-in user information

  // Function to handle email/password form submission
  const handleEmailAuth = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    // Basic validation - check if email and password are provided
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true); // Show loading state
    setError(''); // Clear any previous errors

    try {
      // Sign in with email and password
      const result = await signInWithEmail(email, password);

      if (result.success) {
        // Authentication successful
        setUser(result.user);
        console.log('Authentication successful!');
        // You can redirect user or update app state here
      } else {
        // Show error message if authentication failed
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Authentication error:', error);
    }

    setLoading(false); // Hide loading state
  };

  // Function to handle Google sign-in
  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        setUser(result.user);
        console.log('Google authentication successful!');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error('Google auth error:', error);
    }

    setLoading(false);
  };

  // If user is logged in, show welcome message
  if (user) {
    return (
      <div className="login-container">
        <div className="login-success">
          <h2>Welcome!</h2>
          <p>Successfully logged in as: {user.email}</p>
          <p>User ID: {user.uid}</p>
          {user.photoURL && (
            <img src={user.photoURL} alt="Profile" className="profile-photo" />
          )}
        </div>
      </div>
    );
  }
  // Main login form
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        
        {/* Display error message if there's an error */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Email and Password Form */}
        <form onSubmit={handleEmailAuth}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading} // Disable input during loading
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
            {/* Submit button */}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        
        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>
        
        {/* Google Sign-in Button */}
        <button 
          onClick={handleGoogleAuth} 
          className="google-button"
          disabled={loading}        >
          {loading ? 'Please wait...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
};

export default Login;
