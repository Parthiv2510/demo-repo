import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './Adminpanel.css';
import Manageposts from './Managepost';
import Manageusers from './Manageusers';
import Managecaegories from './ManageCategories';

const AdminPanel = () => {
  return (
    <div className='admin-container'>
      <Sidebar />
      <div className='main-content'>
        <div className='header'>
          
        <h1>Welcome to the Admin Panel</h1>
          
        </div>
        <Routes>
          <Route path="manageposts" element={<Manageposts />} />
          <Route path='manageusers' element={<Manageusers/>}/>
          <Route path='ManageCategories' element={<Managecaegories/>}/>
         
        </Routes>
        
      </div>
    </div>
  );
};

export default AdminPanel;
