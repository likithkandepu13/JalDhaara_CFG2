import { useState, useEffect } from 'react';
import AdminNavBar from './adminNavBar';
import './admin.css';

function AdminHome() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch posts on component mount (mock data)
  useEffect(() => {
    // Replace with actual API call
    setPosts([
      { id: 1, title: 'WASH Program Update', content: 'New awareness session planned.' },
    ]);
  }, []);

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.content) newErrors.content = 'Content is required';
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editId) {
      // Update post (mock)
      setPosts(posts.map((post) => (post.id === editId ? { ...post, ...formData } : post)));
      setEditId(null);
    } else {
      // Create post (mock)
      setPosts([...posts, { id: Date.now(), ...formData }]);
    }
    setFormData({ title: '', content: '' });
    setErrors({});
  };

  // Set post data for editing
  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content });
    setEditId(post.id);
  };

  // Delete post (mock)
  const handleDelete = async (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="admin-container">
      <AdminNavBar />
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={errors.content ? 'input-error' : ''}
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </div>
        <button type="submit" className="submit-btn">{editId ? 'Update' : 'Create'} Post</button>
      </form>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(post.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;