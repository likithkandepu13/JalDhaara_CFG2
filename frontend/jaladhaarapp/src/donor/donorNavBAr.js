import { NavLink } from 'react-router-dom';
import '../Components/common.css';

function DonorNavBar() {
  return (
    <nav className="donor-navbar">
      <h2>Donor Panel</h2>
      <ul className="nav-links">
        <li><NavLink to="/donor">Dashboard</NavLink></li>
        <li><NavLink to="/" onClick={() => localStorage.clear()}>Logout</NavLink></li>
      </ul>
    </nav>
  );
}

export default DonorNavBar;