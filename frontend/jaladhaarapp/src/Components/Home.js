import './common.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Jaldhaara Foundation</h1>
      <p>Providing clean water and sanitation to marginalized communities in India.</p>
      <div className="home-content">
        <h2>Our Mission</h2>
        <p>
          Jaldhaara aims to develop sustainable Water, Sanitation, and Hygiene (WASH) solutions for
          over 2,000 communities by 2024.
        </p>
        <h2>Our Impact</h2>
        <ul>
          <li>Partnered with WaterHealth to serve over 7 million people.</li>
          <li>Reduced school absenteeism by 49% through the 'Water for Schools' program.</li>
          <li>Implemented innovative AWG technology with Maithri Aquatech.</li>
        </ul>
        <a href="/signup" className="cta-btn">Join Us Today</a>
      </div>
    </div>
  );
}

export default Home;