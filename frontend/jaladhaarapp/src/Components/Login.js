import React, { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from '../firebase/auth';
import './common.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signInWithEmail(email, password);

      if (result.success) {
        setUser(result.user);
        console.log('Authentication successful!');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Authentication error:', error);
    }

    setLoading(false);
  };

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

  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-card fade-in">
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

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleEmailAuth} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              className={error && !email ? 'input-error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              className={error && !password ? 'input-error' : ''}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>

        <div className="divider" style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
          <span>OR</span>
        </div>

        <button
          onClick={handleGoogleAuth}
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
};

export default Login;
