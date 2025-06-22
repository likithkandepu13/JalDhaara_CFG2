import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import Mission from './Components/Mission';
import Projects from './Components/Projects';
import Donate from './Components/Donate';
import Contact from './Components/Contact';
import AdminHome from './admin/adminHome';
import DonorHome from './donor/donarHome';
import ViewCompanies from './donor/ViewCompanies';
import MainNavBar from './Components/mainNavBar';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

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
    <AuthProvider>
      <Router>
        <div className="app-container">
          <MainNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
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
            <Route
              path="/donor/companies"
              element={
                <ProtectedRoute role="donor">
                  <ViewCompanies />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;