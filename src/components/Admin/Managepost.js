import React, { useState, useEffect } from 'react';
import './Managepost.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Manageposts = () => {
  const [posts, setPosts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('An error occurred while fetching posts.');
    }
  };

  const addPost = () => {
    setIsAdding(true);
    setIsEditing(false);
    setNewPost({ title: '', content: '', image: null });
    setImagePreview(null);
  };

  const editPost = (post) => {
    setIsEditing(true);
    setIsAdding(false);
    setCurrentPostId(post._id);
    setNewPost({ title: post.title, content: post.content, image: post.image });
    setImagePreview(post.image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const savePost = async () => {
    if (newPost.title && newPost.content) {
      try {
        const url = isEditing ? `http://localhost:3000/posts/${currentPostId}` : 'http://localhost:3000/posts';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });

        const data = await response.json();
        if (data.success) {
          fetchPosts();
          setIsAdding(false);
          setIsEditing(false);
          setNewPost({ title: '', content: '', image: null });
          setImagePreview(null);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error saving post:', error);
        alert('An error occurred while saving the post.');
      }
    } else {
      alert('Please fill in both the title and content.');
    }
  };

  const deletePost = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          setPosts(posts.filter(post => post._id !== id));
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post.');
      }
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
      {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className='managepost'>
      <h2>Manage Posts</h2>
      <div>
        {!isAdding && !isEditing ? (
          <button onClick={addPost}>Add Post</button>
        ) : (
          <div className='new-post-form'>
            <input
              type='text'
              placeholder='Post Title'
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <ReactQuill
              value={newPost.content}
              onChange={(content) => setNewPost({ ...newPost, content })}
              modules={modules}
            />
            <input type='file' accept='image/*' onChange={handleImageChange} />
            {imagePreview && (
              <div className='image-preview'>
                <img src={imagePreview} alt='Preview' />
              </div>
            )}
            <button onClick={savePost}>{isEditing ? 'Update Post' : 'Save Post'}</button>
          </div>
        )}
      </div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <button onClick={() => editPost(post)}>Edit</button>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Manageposts;
