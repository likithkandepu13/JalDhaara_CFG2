// Home Component - Jaldhaara Foundation
// Main landing page showcasing the organization's mission and impact

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="highlight">JalDhaara Foundation</span>
              <br />Conserving Water, Preserving Life
            </h1>
            <p className="hero-subtitle">
              Building sustainable Water Sanitation and Hygiene (WASH) solutions 
              for over 2,000 communities by 2024. Providing safe, affordable drinking 
              water to marginalized communities across India.
            </p>
            <div className="hero-buttons">
              <Link to="/donate" className="btn btn-primary">
                Donate Now 💧
              </Link>
              <Link to="/mission" className="btn btn-secondary">
                Our Mission
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="water-animation">
              <div className="water-drop drop-1">💧</div>
              <div className="water-drop drop-2">💧</div>
              <div className="water-drop drop-3">💧</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">7M+</div>
              <div className="stat-label">People Served</div>
              <div className="stat-description">Community members with access to clean water</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">450+</div>
              <div className="stat-label">Water Centers</div>
              <div className="stat-description">Active WaterHealth Centers across states</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">49%</div>
              <div className="stat-label">Reduced Absenteeism</div>
              <div className="stat-description">In schools through Water for Schools program</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20L</div>
              <div className="stat-label">Affordable Water</div>
              <div className="stat-description">₹8-10 vs market price of ₹20</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-section">
        <div className="container">
          <div className="problem-content">
            <div className="problem-text">
              <h2 className="section-title">The Water Crisis</h2>
              <p className="problem-description">
                <strong>78 million people</strong> across the globe lack access to clean drinking water. 
                In India, isolated and marginalized communities face daily challenges accessing 
                safe water, sanitation, and hygiene facilities.
              </p>
              <p>
                While standard 20L water bottles cost ₹20, many communities cannot afford this 
                basic necessity. JalDhaara believes <em>all communities deserve access to the same 
                quality of drinking water</em>, regardless of their economic status.
              </p>
            </div>
            <div className="problem-visual">
              <div className="water-crisis-card">
                <h3>🚰 The Challenge</h3>
                <ul>
                  <li>78M people without clean water globally</li>
                  <li>Marginalized communities underserved</li>
                  <li>High cost of clean water (₹20/20L)</li>
                  <li>Poor sanitation and hygiene practices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section">
        <div className="container">
          <h2 className="section-title">Our Solutions</h2>
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="solution-icon">🏭</div>
              <h3>WaterHealth Centers</h3>
              <p>
                Decentralized water purification units serving 5,000-20,000 people per community. 
                Built on 20-25 year BOT agreements with local governments.
              </p>
            </div>
            <div className="solution-card">
              <div className="solution-icon">🏫</div>
              <h3>Water for Schools</h3>
              <p>
                Providing safe, affordable drinking water to government schools, 
                reducing absenteeism by 49% and improving student health.
              </p>
            </div>
            <div className="solution-card">
              <div className="solution-icon">🌥️</div>
              <h3>MEGHDOOT Technology</h3>
              <p>
                Atmospheric Water Generators (AWG) - innovative, sustainable water 
                technology that extracts water from air.
              </p>
            </div>
            <div className="solution-card">
              <div className="solution-icon">📚</div>
              <h3>Community Awareness</h3>
              <p>
                WASH education programs on World Water Day, World Toilet Day, 
                and Global Handwashing Day to promote hygiene practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="container">
          <h2 className="section-title">Our Partners</h2>
          <div className="partners-content">
            <div className="partner-card">
              <h3>🏥 WaterHealth International</h3>
              <p>450+ active water purification units serving 7M+ community members across multiple states.</p>
            </div>
            <div className="partner-card">
              <h3>🌍 Maithri Aquatech</h3>
              <p>International innovative partner pioneering AWG technology with MEGHDOOT solutions.</p>
            </div>
            <div className="partner-card">
              <h3>🏢 Corporate Partners</h3>
              <p>Companies fulfilling CSR requirements by supporting clean water initiatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>
              Help us expand our reach to more communities. Your contribution can provide 
              clean water access to families who need it most.
            </p>
            <div className="cta-buttons">
              <Link to="/donate" className="btn btn-primary large">
                Donate Now 💝
              </Link>
              <Link to="/projects" className="btn btn-outline large">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;