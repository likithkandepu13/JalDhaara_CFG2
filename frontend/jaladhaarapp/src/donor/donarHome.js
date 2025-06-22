import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorNavBar from './donorNavBAr';
import './donor.css';

function DonorHome() {
  const [profile, setProfile] = useState(null);
  const [updateForm, setUpdateForm] = useState({ email: '', companyName: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [invitingAdmin, setInvitingAdmin] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/donor/profile', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setProfile(data);
        setUpdateForm({ email: data.email, companyName: data.companyName });
      } catch (err) {
        setErrors(prev => ({ ...prev, profile: err.message }));
        if (err.message.includes('Token')) navigate('/login');
      }
    };

    const fetchInvitingAdmin = async () => {
      try {
        const response = await fetch('http://localhost:5000/donor/invited-by', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setInvitingAdmin(data.username);
      } catch (err) {
        setErrors(prev => ({ ...prev, invitingAdmin: err.message }));
        if (err.message.includes('Token')) navigate('/login');
      }
    };

    fetchProfile();
    fetchInvitingAdmin();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(prev => ({ ...prev, update: '' }));

    try {
      const response = await fetch('http://localhost:5000/donor/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(updateForm)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update profile');
      setProfile(data.donor);
      setErrors(prev => ({ ...prev, update: 'Profile updated successfully' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, update: err.message }));
      if (err.message.includes('Token')) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(prev => ({ ...prev, password: '' }));

    try {
      const response = await fetch('http://localhost:5000/donor/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(passwordForm)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to change password');
      setErrors(prev => ({ ...prev, password: 'Password changed successfully' }));
      setPasswordForm({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setErrors(prev => ({ ...prev, password: err.message }));
      if (err.message.includes('Token')) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="donor-home">
      <DonorNavBar />
      <div className="main-content">
        <div className="container">
          <div className="header">
            <h1 className="title">Donor Dashboard</h1>
            <p className="subtitle">Manage your profile and account settings</p>
          </div>

          <div className="profile-overview">
            <div className="profile-header">
              <div className="profile-icon">👤</div>
              <div className="profile-info">
                <h2>{profile.companyName || 'Donor'}</h2>
                <p>{profile.email}</p>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-icon">📧</div>
                <div>
                  <p className="stat-label">Email</p>
                  <p className="stat-value">{profile.email}</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🏢</div>
                <div>
                  <p className="stat-label">Company Name</p>
                  <p className="stat-value">{profile.companyName}</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">📊</div>
                <div>
                  <p className="stat-label">Status</p>
                  <p className="stat-value">{profile.status}</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">👥</div>
                <div>
                  <p className="stat-label">Invited By</p>
                  <p className="stat-value">{invitingAdmin || 'Loading...'}</p>
                </div>
              </div>
              {errors.profile && <p className="message">{errors.profile}</p>}
              {errors.invitingAdmin && <p className="message">{errors.invitingAdmin}</p>}
            </div>
          </div>

          <div className="forms-grid">
            <div className="form-card">
              <div className="form-header">
                <div className="form-icon">✏️</div>
                <h3>Update Profile</h3>
              </div>
              <form onSubmit={handleUpdateProfile} className="form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      id="email"
                      value={updateForm.email}
                      onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🏢</span>
                    <input
                      type="text"
                      id="companyName"
                      value={updateForm.companyName}
                      onChange={(e) => setUpdateForm({ ...updateForm, companyName: e.target.value })}
                      placeholder="Enter company name"
                      disabled={loading}
                    />
                  </div>
                </div>
                <button type="submit" className="submit-btn primary" disabled={loading}>
                  {loading ? (
                    <div className="btn-loading">
                      <div className="btn-spinner"></div>
                      Updating...
                    </div>
                  ) : (
                    <>
                      <span className="btn-icon">✅</span>
                      Update Profile
                    </>
                  )}
                </button>
                {errors.update && (
                  <p className={`message ${errors.update.includes('successfully') ? 'success' : ''}`}>
                    {errors.update}
                  </p>
                )}
              </form>
            </div>

            <div className="form-card">
              <div className="form-header">
                <div className="form-icon">🔒</div>
                <h3>Change Password</h3>
              </div>
              <form onSubmit={handleChangePassword} className="form">
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🔐</span>
                    <input
                      type="password"
                      id="oldPassword"
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      placeholder="Enter old password"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🔐</span>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      disabled={loading}
                    />
                  </div>
                </div>
                <button type="submit" className="submit-btn secondary" disabled={loading}>
                  {loading ? (
                    <div className="btn-loading">
                      <div className="btn-spinner"></div>
                      Changing...
                    </div>
                  ) : (
                    <>
                      <span className="btn-icon">🔄</span>
                      Change Password
                    </>
                  )}
                </button>
                {errors.password && (
                  <p className={`message ${errors.password.includes('successfully') ? 'success' : ''}`}>
                    {errors.password}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorHome;