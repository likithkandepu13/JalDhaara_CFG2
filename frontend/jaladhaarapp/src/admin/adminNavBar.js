import { NavLink } from 'react-router-dom';
import '../Components/common.css';

function AdminNavBar() {
  return (
    <nav className="admin-navbar">
      <h2>Admin Panel</h2>
      <ul className="nav-links">
        <li><NavLink to="/admin">Dashboard</NavLink></li>
        <li><NavLink to="/" onClick={() => localStorage.clear()}>Logout</NavLink></li>
      </ul>
    </nav>
  );
}

export default AdminNavBar;