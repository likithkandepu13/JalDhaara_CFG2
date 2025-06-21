// About Component - JalDhaara Foundation
// Detailed information about the organization's background and approach

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>About JalDhaara Foundation</h1>
          <p className="about-subtitle">
            A not-for-profit organization building solutions for safe water, 
            sanitation and hygiene in unaddressed, isolated and marginalized communities across India.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission">
        <div className="container">
          <div className="vm-grid">
            <div className="vm-card vision-card">
              <div className="vm-icon">🎯</div>
              <h2>Our Vision</h2>
              <p>
                To build comprehensive solutions that provide safe water, sanitation 
                and hygienic practices in unaddressed, isolated and marginalized 
                communities across India.
              </p>
            </div>
            <div className="vm-card mission-card">
              <div className="vm-icon">🚀</div>
              <h2>Our Mission</h2>
              <p>
                To develop and implement sustainable Water Sanitation and Hygiene (WASH) 
                solutions across over two thousand communities by 2024, ensuring access 
                to clean drinking water at affordable prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="approach-section">
        <div className="container">
          <h2 className="section-title">Our Approach</h2>
          <div className="approach-content">
            <div className="approach-text">
              <h3>🌊 Affordable Access to Clean Water</h3>
              <p>
                We believe that all communities deserve access to the same or comparable 
                quality of drinking water, regardless of their economic status. While 
                the standard price of a 20L bottle of water is ₹20, JalDhaara provides 
                clean water at just ₹8-10 for 20L by partnering with organizations and 
                leveraging economies of scale.
              </p>
              
              <h3>🏗️ Sustainable Infrastructure</h3>
              <p>
                Our water purification systems are built on Build Operate Transfer (BOT) 
                agreements with Local Government Agencies like Panchayats or Municipalities, 
                with concession terms spanning 20-25 years, ensuring long-term sustainability.
              </p>
              
              <h3>📊 WHO Standards Compliance</h3>
              <p>
                All our water purification processes meet World Health Organization's 
                standards, ensuring that communities receive safe, clean drinking water 
                that meets international quality benchmarks.
              </p>
            </div>
            <div className="approach-visual">
              <div className="quality-card">
                <h4>🎖️ Quality Assurance</h4>
                <ul>
                  <li>WHO standard compliance</li>
                  <li>Regular quality testing</li>
                  <li>Community feedback monitoring</li>
                  <li>Continuous improvement processes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="technology-section">
        <div className="container">
          <h2 className="section-title">Technology & Innovation</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon">🏭</div>
              <h3>Decentralized Community Water Systems (DCWS)</h3>
              <p>
                WaterHealth Centers equipped with advanced purification technology 
                can serve communities of 5,000 to 20,000 people, providing reliable 
                access to clean water at the community level.
              </p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🌥️</div>
              <h3>Atmospheric Water Generation (AWG)</h3>
              <p>
                Our partnership with Maithri Aquatech brings MEGHDOOT technology - 
                a nature-based renewable water solution that extracts water from 
                atmospheric humidity, providing sustainable water access.
              </p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🚚</div>
              <h3>Delivery Service Network</h3>
              <p>
                Young entrepreneurs from local communities serve as Delivery Service 
                Providers (DSPs), facilitating water transportation from Water Health 
                Centers to schools and residences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="impact-stories">
        <div className="container">
          <h2 className="section-title">Real Impact, Real Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-icon">🏫</div>
              <h3>Water for Schools Success</h3>
              <p>
                Through our Water for Schools program, we've reached government schools 
                in the vicinity of water purification units, resulting in a remarkable 
                <strong> 49% reduction in student absenteeism</strong> and improved 
                overall health outcomes.
              </p>
            </div>
            <div className="story-card">
              <div className="story-icon">👥</div>
              <h3>Community Transformation</h3>
              <p>
                Our 450+ active WaterHealth Centers across multiple states have 
                transformed the lives of <strong>over 7 million community members</strong>, 
                providing them with reliable access to safe drinking water.
              </p>
            </div>
            <div className="story-card">
              <div className="story-icon">🌍</div>
              <h3>Environmental Impact</h3>
              <p>
                By promoting sustainable water practices and reducing dependency on 
                bottled water, we're contributing to environmental conservation while 
                ensuring community health and well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community-Centric</h3>
              <p>We work directly with communities, understanding their needs and challenges firsthand.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">♻️</div>
              <h3>Sustainability</h3>
              <p>Our solutions are designed for long-term impact with minimal environmental footprint.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Accessibility</h3>
              <p>Making clean water affordable and accessible to all, regardless of economic status.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3>Innovation</h3>
              <p>Leveraging cutting-edge technology to solve water challenges effectively.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
