import React, { useState, useEffect } from 'react';
import './ManageCategories.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('An error occurred while fetching categories.');
    }
  };

  const addCategory = async () => {
    if (newCategory.trim() === '') {
      alert('Please enter a category name.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });

      const data = await response.json();
      if (data.success) {
        fetchCategories();
        setNewCategory('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('An error occurred while adding the category.');
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchCategories();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('An error occurred while deleting the category.');
    }
  };

  return (
    <div className='manage-categories'>
      <h2>Manage Categories</h2>
      <div className='category-form'>
        <input
          type='text'
          placeholder='Category Name'
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <ul>
          {categories.map(category => (
            <li key={category._id}>
              {category.name}
              <button onClick={() => deleteCategory(category._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCategories;
