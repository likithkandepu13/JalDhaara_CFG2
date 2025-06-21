import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'donation', label: 'Donation & Fundraising' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'partnership', label: 'Corporate Partnership' },
    { value: 'media', label: 'Media & Press' },
    { value: 'support', label: 'Technical Support' }
  ];

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Let's work together to bring clean water to every community.</p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <div className="form-container">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    {inquiryTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief subject of your message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="contact-info-section">
          <div className="contact-info">
            <h2>Contact Information</h2>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Head Office</h3>
                <p>123 Water Street, Clean City<br/>New Delhi, India - 110001</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+91 98765 43210<br/>+91 11 2345 6789</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h3>Email</h3>
                <p>info@jaldhaarafoundation.org<br/>support@jaldhaarafoundation.org</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🕒</div>
              <div className="info-content">
                <h3>Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <div className="quick-links">
            <h3>Quick Links</h3>
            <div className="links-grid">
              <a href="/donate" className="quick-link">
                <span className="link-icon">💝</span>
                <span>Make a Donation</span>
              </a>
              <a href="/projects" className="quick-link">
                <span className="link-icon">🏗️</span>
                <span>View Projects</span>
              </a>
              <a href="/about" className="quick-link">
                <span className="link-icon">ℹ️</span>
                <span>About Us</span>
              </a>
              <a href="#volunteer" className="quick-link">
                <span className="link-icon">🤝</span>
                <span>Volunteer</span>
              </a>
            </div>
          </div>

          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <span>📘</span> Facebook
              </a>
              <a href="#" className="social-link twitter">
                <span>🐦</span> Twitter
              </a>
              <a href="#" className="social-link instagram">
                <span>📷</span> Instagram
              </a>
              <a href="#" className="social-link linkedin">
                <span>💼</span> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How can I volunteer with JalDhaara Foundation?</h4>
            <p>We welcome volunteers for field work, fundraising, and awareness campaigns. Contact us through the form above or email volunteer@jaldhaarafoundation.org</p>
          </div>
          <div className="faq-item">
            <h4>Can my company partner with JalDhaara Foundation?</h4>
            <p>Yes! We offer various corporate partnership opportunities including CSR projects, employee engagement programs, and co-branded initiatives.</p>
          </div>
          <div className="faq-item">
            <h4>How do I know my donation is being used effectively?</h4>
            <p>We provide regular updates with photos, reports, and impact stories. 100% of donations go directly to water projects with full transparency.</p>
          </div>
          <div className="faq-item">
            <h4>Do you work internationally?</h4>
            <p>Currently, we focus on water projects within India. However, we're open to international partnerships and knowledge exchange programs.</p>
          </div>
          <div className="faq-item">
            <h4>How long does it take to complete a water project?</h4>
            <p>Project timelines vary. A basic well takes 2-4 weeks, while larger purification systems can take 2-3 months including community training.</p>
          </div>
          <div className="faq-item">
            <h4>Can I visit your project sites?</h4>
            <p>Yes! We organize regular donor visits and volunteer trips to project sites. Contact us to arrange a visit.</p>
          </div>
        </div>
      </div>

      <div className="emergency-contact">
        <div className="emergency-content">
          <h3>🚨 Emergency Water Crisis?</h3>
          <p>If you're aware of a water emergency or crisis situation, please contact our emergency response team immediately.</p>
          <div className="emergency-info">
            <div className="emergency-number">
              <strong>Emergency Hotline: +91 98888 77777</strong>
            </div>
            <div className="emergency-email">
              <strong>Email: emergency@jaldhaarafoundation.org</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
