import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Clean Water Wells Initiative",
      description: "Installing sustainable water wells in remote villages across rural India, providing clean drinking water to over 10,000 families.",
      status: "Active",
      impact: "50+ wells installed",
      location: "Rajasthan, Maharashtra",
      image: "🏗️",
      progress: 75
    },
    {
      id: 2,
      title: "Water Purification Systems",
      description: "Deploying advanced water purification technology in schools and community centers to ensure safe drinking water for children and families.",
      status: "Active",
      impact: "25 systems deployed",
      location: "Bihar, Uttar Pradesh",
      image: "🔬",
      progress: 60
    },
    {
      id: 3,
      title: "Rainwater Harvesting Program",
      description: "Teaching communities to build and maintain rainwater harvesting systems to reduce dependency on groundwater.",
      status: "Active",
      impact: "100+ systems built",
      location: "Tamil Nadu, Karnataka",
      image: "🌧️",
      progress: 85
    },
    {
      id: 4,
      title: "Water Quality Monitoring",
      description: "Regular testing and monitoring of water sources to ensure safety standards and prevent waterborne diseases.",
      status: "Ongoing",
      impact: "500+ sources monitored",
      location: "Pan-India",
      image: "🔍",
      progress: 90
    },
    {
      id: 5,
      title: "Community Education Drive",
      description: "Educating communities about water conservation, hygiene practices, and sustainable water management techniques.",
      status: "Active",
      impact: "20,000+ people educated",
      location: "Multiple States",
      image: "📚",
      progress: 70
    },
    {
      id: 6,
      title: "Emergency Water Relief",
      description: "Providing immediate water relief during natural disasters and drought situations across affected regions.",
      status: "Standby",
      impact: "15+ relief operations",
      location: "Disaster-affected areas",
      image: "🚛",
      progress: 100
    }
  ];

  const upcomingProjects = [
    {
      title: "Solar-Powered Water Pumps",
      description: "Installing solar-powered water pumping systems in 50 villages",
      timeline: "Q2 2024",
      funding: "₹25 Lakhs required"
    },
    {
      title: "Water ATM Network",
      description: "Establishing automated water dispensing units in urban slums",
      timeline: "Q3 2024",
      funding: "₹40 Lakhs required"
    },
    {
      title: "Digital Water Management",
      description: "IoT-based smart water monitoring and management system",
      timeline: "Q4 2024",
      funding: "₹60 Lakhs required"
    }
  ];

  return (
    <div className="projects-container">
      <div className="projects-hero">
        <h1>Our Projects</h1>
        <p>Transforming lives through sustainable water solutions across India</p>
      </div>

      <div className="projects-content">
        <section className="active-projects">
          <h2>Active Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <div className="project-icon">{project.image}</div>
                  <div className="project-status">
                    <span className={`status-badge ${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-details">
                  <div className="detail-item">
                    <strong>Impact:</strong> {project.impact}
                  </div>
                  <div className="detail-item">
                    <strong>Location:</strong> {project.location}
                  </div>
                </div>
                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="upcoming-projects">
          <h2>Upcoming Projects</h2>
          <div className="upcoming-grid">
            {upcomingProjects.map((project, index) => (
              <div key={index} className="upcoming-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="upcoming-details">
                  <div className="detail-row">
                    <span className="detail-label">Timeline:</span>
                    <span className="detail-value">{project.timeline}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Funding Needed:</span>
                    <span className="detail-value funding">{project.funding}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-impact">
          <h2>Overall Impact</h2>
          <div className="impact-stats">
            <div className="stat-card">
              <div className="stat-number">100,000+</div>
              <div className="stat-label">Lives Impacted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Villages Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Water Sources Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Organizations</div>
            </div>
          </div>
        </section>

        <section className="get-involved">
          <div className="involvement-cta">
            <h2>Get Involved</h2>
            <p>Join us in our mission to provide clean water access to every community in India</p>
            <div className="cta-buttons">
              <a href="/donate" className="cta-button primary">Support Our Projects</a>
              <a href="/contact" className="cta-button secondary">Partner With Us</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
