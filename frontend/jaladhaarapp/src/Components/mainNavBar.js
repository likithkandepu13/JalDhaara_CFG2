import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './MainNavBar.css';

function MainNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
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
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <span className="logo-icon">💧</span>
            <span className="logo-text">JalDhaara Foundation</span>
          </NavLink>
        </div>
        
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/mission" onClick={closeMenu}>Mission</NavLink></li>
          <li><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
          <li><NavLink to="/donate" onClick={closeMenu}>Donate</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
          
          {!user ? (
            <li><NavLink to="/login" className="login-link" onClick={closeMenu}>Login</NavLink></li>
          ) : (
            <li className="user-menu">
              <span className="user-greeting">Hello, {user.displayName || user.email}</span>
              {user.email === 'admin@jaldhaarafoundation.org' && (
                <NavLink to="/admin" onClick={closeMenu}>Admin Dashboard</NavLink>
              )}
              <NavLink to="/donor" onClick={closeMenu}>Dashboard</NavLink>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default MainNavBar;