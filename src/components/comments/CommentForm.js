import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        onCommentAdded(data.comment);
        setFormData({ name: '', email: '', comment: '' });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('An error occurred while posting the comment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea 
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Leave a comment..."
        required
      />
      <input 
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
