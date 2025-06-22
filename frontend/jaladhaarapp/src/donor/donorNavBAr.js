import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './donor.css';

function DonorNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="donor-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/donor" className="logo" onClick={closeMenu}>
          <span className="logo-icon">💧</span>
          <span className="logo-text">Donor Panel</span>
        </NavLink>

        {/* Hamburger Toggle */}
        <div className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <NavLink to="/donor" className="nav-link" onClick={closeMenu}>
            <span className="nav-icon">🏠</span>
            Dashboard
          </NavLink>
          <NavLink to="/donor/companies" className="nav-link" onClick={closeMenu}>
            <span className="nav-icon">🏢</span>
            View Companies
          </NavLink>
          <div className="user-menu">
            {user && (
              <div className="user-info">
                <div className="user-avatar">{user.displayName?.[0] || user.email?.[0] || 'U'}</div>
                <div className="user-details">
                  <p className="user-name">{user.displayName || 'Donor'}</p>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
            )}
            <button className="logout-btn" onClick={() => { handleLogout(); closeMenu(); }}>
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/donor" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">🏠</span>
            Dashboard
          </NavLink>
          <NavLink to="/donor/companies" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">🏢</span>
            View Companies
          </NavLink>
          {user && (
            <div className="mobile-user-info">
              <div className="user-avatar">{user.displayName?.[0] || user.email?.[0] || 'U'}</div>
              <div className="user-details">
                <p className="user-name">{user.displayName || 'Donor'}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          )}
          <button className="mobile-logout-btn" onClick={() => { handleLogout(); closeMenu(); }}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DonorNavBar;