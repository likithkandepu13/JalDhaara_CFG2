import { NavLink } from 'react-router-dom';
import './common.css';

function MainNavBar() {
  // Handle logout by clearing localStorage
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <nav className="main-navbar">
      <h1 className="logo">Jaldhaara</h1>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        {!token ? (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Register</NavLink></li>
          </>
        ) : (
          <>
            {role === 'admin' && <li><NavLink to="/admin">Admin Dashboard</NavLink></li>}
            {role === 'donor' && <li><NavLink to="/donor">Donor Dashboard</NavLink></li>}
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default MainNavBar;