import React from 'react';
import { Link } from 'react-router-dom';

const NewPostGrid = ({ posts }) => {
  return (
    <div className="new-post-grid">
      {posts.map(post => (
        <div key={post._id} className="post">
          <Link to={`/post/${post._id}`}>
            <h3>{post.title}</h3>
            {post.image && <img src={post.image} alt={post.title} />}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewPostGrid;
