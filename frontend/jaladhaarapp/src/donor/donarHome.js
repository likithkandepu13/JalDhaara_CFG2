import { useState, useEffect } from 'react';
import DonorNavBar from '../donorNavBar';
import './donor.css';

function DonorHome() {
  const [posts, setPosts] = useState([]);

  // Fetch posts on component mount (mock data)
  useEffect(() => {
    // Replace with actual API call
    setPosts([
      { id: 1, title: 'WASH Program Update', content: 'New awareness session planned.' },
    ]);
  }, []);

  return (
    <div className="donor-container">
      <DonorNavBar />
      <h2>Donor Dashboard</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonorHome;