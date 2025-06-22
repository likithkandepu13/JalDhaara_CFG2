import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorNavBar from './donorNavBAr';
import './donor.css';

function ViewCompanies() {
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/admin/companies/view', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch companies');
        setCompanies(data);
      } catch (err) {
        setErrors(prev => ({ ...prev, companies: err.message }));
        if (err.message.includes('Token')) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading companies...</p>
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
            <h1 className="title">View Companies</h1>
            <p className="subtitle">Browse all registered companies and their CSR details</p>
          </div>
          {errors.companies && (
            <p className="message">{errors.companies}</p>
          )}
          <div className="forms-grid">
            {companies.length > 0 ? (
              companies.map((company, index) => (
                <div className="form-card" key={company._id || index}>
                  <div className="form-header">
                    <div className="form-icon">🏢</div>
                    <h3>{company.username || 'Unnamed Company'}</h3>
                  </div>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <div className="stat-icon">📅</div>
                      <div>
                        <p className="stat-label">CSR Year</p>
                        <p className="stat-value">{company.csrYear || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">💰</div>
                      <div>
                        <p className="stat-label">CSR Spent (Crores)</p>
                        <p className="stat-value">{company.csrSpentCrores || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">📊</div>
                      <div>
                        <p className="stat-label">Budget Percentage</p>
                        <p className="stat-value">{company.budgetPercentage ? `${company.budgetPercentage}%` : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">🌱</div>
                      <div>
                        <p className="stat-label">Plant Initiative</p>
                        <p className="stat-value">{company.plantInitiative || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">🎯</div>
                      <div>
                        <p className="stat-label">CSR Focus Areas</p>
                        <p className="stat-value">{company.csrFocusAreas?.length > 0 ? company.csrFocusAreas.join(', ') : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">📋</div>
                      <div>
                        <p className="stat-label">CSR Expenditure Breakup</p>
                        <p className="stat-value">
                          {company.csrExpenditureBreakup?.length > 0
                            ? company.csrExpenditureBreakup.map(item => `${item.category}: ₹${item.amount} Cr`).join(', ')
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="message">No companies found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCompanies;