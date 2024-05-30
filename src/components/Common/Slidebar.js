import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Create this file for sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/admin/manage-posts">Manage Posts</Link></li>
        <li><Link to="/admin/manage-users">Manage Users</Link></li>
        <li><Link to="/admin/manage-topics">Manage Topics</Link></li>
        <li><Link to="/admin/add-post">Add Post</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
