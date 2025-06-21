import React from 'react';
import './Mission.css';

const Mission = () => {
  return (
    <div className="mission-container">
      {/* Hero Section */}
      <section className="mission-hero">
        <div className="hero-content">
          <h1>Our Mission</h1>
          <p>Ensuring clean, safe water for every community across India</p>
        </div>
        <div className="water-wave"></div>
      </section>

      {/* Mission Statement */}
      <section className="mission-statement">
        <div className="container">
          <div className="mission-text">
            <h2>What We Stand For</h2>
            <p>
              JalDhaara Foundation is committed to transforming lives through sustainable water solutions. 
              We believe that access to clean water is not just a necessity, but a fundamental human right 
              that every individual deserves.
            </p>
            <p>
              Our mission is to bridge the gap between water scarcity and abundance, creating lasting 
              impact through innovative technology, community engagement, and environmental stewardship.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌊</div>
              <h3>Sustainability</h3>
              <p>We create long-term solutions that protect and preserve water resources for future generations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>Working hand-in-hand with local communities to understand their needs and build lasting partnerships.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>Leveraging cutting-edge technology and creative solutions to tackle water challenges effectively.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Impact</h3>
              <p>Measuring success through the positive change we bring to communities and the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Goals */}
      <section className="mission-goals">
        <div className="container">
          <h2>Our Goals</h2>
          <div className="goals-list">
            <div className="goal-item">
              <div className="goal-number">01</div>
              <div className="goal-content">
                <h3>Universal Access</h3>
                <p>Provide clean, safe drinking water to underserved communities across rural and urban India.</p>
              </div>
            </div>
            <div className="goal-item">
              <div className="goal-number">02</div>
              <div className="goal-content">
                <h3>Water Conservation</h3>
                <p>Implement rainwater harvesting and water recycling systems to maximize resource utilization.</p>
              </div>
            </div>
            <div className="goal-item">
              <div className="goal-number">03</div>
              <div className="goal-content">
                <h3>Education & Awareness</h3>
                <p>Educate communities about water conservation, hygiene, and sustainable practices.</p>
              </div>
            </div>
            <div className="goal-item">
              <div className="goal-number">04</div>
              <div className="goal-content">
                <h3>Technology Integration</h3>
                <p>Deploy smart water management systems and IoT solutions for efficient resource monitoring.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mission-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>Together, we can make a difference. Every drop counts, every action matters.</p>
            <div className="cta-buttons">
              <button className="btn-primary">Support Our Cause</button>
              <button className="btn-secondary">Volunteer With Us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
