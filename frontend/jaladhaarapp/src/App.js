import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';

import AdminHome from './admin/adminHome';
import DonorHome from './donor/donarHome';
import MainNavBar from './Components/mainNavBar';
import './App.css';
// Import our Login component to test Firebase authentication
import Login from './Components/Login';

// Simple protected route component to check JWT token and role
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token || (role && userRole !== role)) {
    window.location.href = '/login';
    return null;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <MainNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
         
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor"
            element={
              <ProtectedRoute role="donor">
                <DonorHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
