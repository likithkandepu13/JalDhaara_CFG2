import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './common.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'donor',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Mock API call (replace with actual backend endpoint)
      const mockResponse = { token: 'mock-jwt', role: formData.role };
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('role', mockResponse.role);
      navigate(formData.role === 'admin' ? '/admin' : '/donor');
    } catch (error) {
      setErrors({ form: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {errors.form && <p className="error">{errors.form}</p>}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? 'input-error' : ''}
          >
            <option value="donor">Donor</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default Signup;