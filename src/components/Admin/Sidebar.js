import React from 'react';
import { Link } from 'react-router-dom';
import HeaderImg from '../headerImg.svg';
import './sidebar.css';

const Sidebar = () => {
  const handleLogout = () => {
    
    localStorage.removeItem('userToken');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <img src={HeaderImg} alt='Header' className='header-img' />
      </div>
      <ul>
        <li><Link to="/admin/manageposts">Manage Posts</Link></li>
        <li><Link to="/admin/manageusers">Manage Users</Link></li>
        <li><Link to="/admin/ManageCategories">Manage Categories</Link></li> {/* Add link for managing categories */}
        <li><button onClick={handleLogout} className='logout-button'>Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
