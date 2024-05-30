import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, LinkedinIcon, PinterestIcon, RedditIcon, EmailIcon } from 'react-share';
import './FullBlogPost.css'; 
import CommentForm from './comments/CommentForm';

const FullBlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [shareCount, setShareCount] = useState(203); // Example share count

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.post);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('An error occurred while fetching the post.');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`);
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      alert('An error occurred while fetching the comments.');
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className='full-blog-post'>
      {post ? (
        <>
          <h1>{post.title}</h1>
          {post.image && <img src={post.image} alt={post.title} />}
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          
          
          <div className="share-buttons">
            
            
            <FacebookShareButton url={window.location.href} quote={post.title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href} title={post.title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <RedditShareButton url={window.location.href} title={post.title}>
              <RedditIcon size={32} round />
            </RedditShareButton>
            <LinkedinShareButton url={window.location.href} title={post.title}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton url={window.location.href} subject={post.title} body="Check out this post!">
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>

          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
          <div className="comments">
            <h3>Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p><strong>{comment.name}</strong> ({comment.email})</p>
                  <p>{comment.comment}</p>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default FullBlogPost;
