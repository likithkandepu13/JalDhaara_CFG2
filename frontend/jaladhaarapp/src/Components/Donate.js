import React, { useState } from 'react';
import './Donate.css';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [selectedProject, setSelectedProject] = useState('general');

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const projects = [
    { id: 'general', name: 'General Fund - Where Needed Most', impact: 'Supports all our initiatives' },
    { id: 'wells', name: 'Clean Water Wells', impact: '₹10,000 = 1 family gets clean water for life' },
    { id: 'purification', name: 'Water Purification Systems', impact: '₹25,000 = 1 school gets clean water' },
    { id: 'rainwater', name: 'Rainwater Harvesting', impact: '₹15,000 = 1 community system' },
    { id: 'education', name: 'Water Education Programs', impact: '₹5,000 = 50 people educated' },
    { id: 'emergency', name: 'Emergency Water Relief', impact: '₹2,000 = Emergency water for 10 families' }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const getCurrentAmount = () => {
    return selectedAmount || customAmount || 0;
  };

  const getImpactMessage = () => {
    const amount = getCurrentAmount();
    if (amount >= 50000) return "🌟 Your generous donation can transform an entire village!";
    if (amount >= 25000) return "💧 Your donation can provide clean water to a school!";
    if (amount >= 10000) return "🏠 Your donation can give a family clean water for life!";
    if (amount >= 5000) return "👥 Your donation can educate 50 people about water conservation!";
    if (amount >= 2000) return "🆘 Your donation can provide emergency water relief!";
    if (amount >= 500) return "💝 Every donation makes a difference in someone's life!";
    return "💙 Thank you for considering a donation to our cause!";
  };

  return (
    <div className="donate-container">
      <div className="donate-hero">
        <h1>Make a Difference</h1>
        <p>Your contribution helps provide clean water access to communities in need</p>
      </div>

      <div className="donate-content">
        <div className="donation-form-section">
          <div className="form-container">
            <h2>Choose Your Donation</h2>
            
            {/* Donation Type */}
            <div className="donation-type">
              <label className="type-label">Donation Type:</label>
              <div className="type-options">
                <button 
                  className={`type-button ${donationType === 'one-time' ? 'active' : ''}`}
                  onClick={() => setDonationType('one-time')}
                >
                  One-time
                </button>
                <button 
                  className={`type-button ${donationType === 'monthly' ? 'active' : ''}`}
                  onClick={() => setDonationType('monthly')}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="amount-selection">
              <label className="amount-label">Select Amount (₹):</label>
              <div className="preset-amounts">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect(amount)}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="custom-amount">
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="custom-input"
                />
              </div>
            </div>

            {/* Project Selection */}
            <div className="project-selection">
              <label className="project-label">Choose Project to Support:</label>
              <select 
                value={selectedProject} 
                onChange={(e) => setSelectedProject(e.target.value)}
                className="project-select"
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <div className="project-impact">
                {projects.find(p => p.id === selectedProject)?.impact}
              </div>
            </div>

            {/* Impact Message */}
            <div className="impact-message">
              {getImpactMessage()}
            </div>

            {/* Donation Summary */}
            <div className="donation-summary">
              <div className="summary-row">
                <span>Donation Type:</span>
                <span>{donationType === 'one-time' ? 'One-time' : 'Monthly'}</span>
              </div>
              <div className="summary-row">
                <span>Amount:</span>
                <span>₹{getCurrentAmount().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Project:</span>
                <span>{projects.find(p => p.id === selectedProject)?.name}</span>
              </div>
            </div>

            {/* Donate Button */}
            <button 
              className="donate-button"
              disabled={!getCurrentAmount() || getCurrentAmount() < 100}
            >
              {donationType === 'monthly' ? 'Start Monthly Donation' : 'Donate Now'} - ₹{getCurrentAmount().toLocaleString()}
            </button>

            <div className="secure-note">
              🔒 Your donation is secure and encrypted. We accept all major payment methods.
            </div>
          </div>
        </div>

        <div className="donation-info-section">
          <div className="info-cards">
            <div className="info-card">
              <div className="card-icon">💧</div>
              <h3>Transparency</h3>
              <p>100% of your donation goes directly to water projects. We provide detailed reports on fund utilization.</p>
            </div>
            
            <div className="info-card">
              <div className="card-icon">🏆</div>
              <h3>Impact</h3>
              <p>Over 100,000 lives impacted through our water initiatives across 200+ villages in rural India.</p>
            </div>
            
            <div className="info-card">
              <div className="card-icon">📱</div>
              <h3>Updates</h3>
              <p>Receive regular updates with photos and stories from the communities you're helping.</p>
            </div>
          </div>

          <div className="other-ways">
            <h3>Other Ways to Help</h3>
            <div className="help-options">
              <div className="help-option">
                <strong>Corporate Partnership</strong>
                <p>Partner with us for CSR initiatives and employee engagement programs.</p>
                <a href="/contact" className="help-link">Learn More</a>
              </div>
              <div className="help-option">
                <strong>Volunteer</strong>
                <p>Join our field teams and directly participate in water projects across India.</p>
                <a href="/contact" className="help-link">Get Involved</a>
              </div>
              <div className="help-option">
                <strong>Fundraise</strong>
                <p>Organize fundraising events in your community or workplace.</p>
                <a href="/contact" className="help-link">Start Campaign</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="success-stories">
        <h2>Recent Success Stories</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-image">🏘️</div>
            <h4>Sundarpur Village, Rajasthan</h4>
            <p>"Thanks to donors like you, our village now has clean water. Our children no longer fall sick from waterborne diseases."</p>
            <div className="story-meta">- Ramesh Kumar, Village Head</div>
          </div>
          <div className="story-card">
            <div className="story-image">🏫</div>
            <h4>Government School, Bihar</h4>
            <p>"The water purification system has transformed our school. Student attendance has increased by 40% since installation."</p>
            <div className="story-meta">- Priya Singh, Principal</div>
          </div>
          <div className="story-card">
            <div className="story-image">👩‍👩‍👧‍👦</div>
            <h4>Women's Collective, Maharashtra</h4>
            <p>"We now save 3 hours daily that we used to spend fetching water. We can focus on our children's education and our small business."</p>
            <div className="story-meta">- Sunita Devi, Group Leader</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
