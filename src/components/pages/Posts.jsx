import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [commentText, setCommentText] = useState("");
  const [commentModal, setCommentModal] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, []);
  
  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://nt-devconnector.onrender.com/api/posts", {
        headers: { "x-auth-token": token },
      });
      const reversedPosts = res.data.reverse();
      setPosts(reversedPosts);
      localStorage.setItem("posts", JSON.stringify(reversedPosts));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://nt-devconnector.onrender.com/api/posts",
        { text: commentText },
        { headers: { "x-auth-token": token } }
      );
      setCommentText("");
  
      const newPost = { ...res.data, user: userId };
      const updatedPosts = [newPost, ...posts];

      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/like/${postId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      setPosts(posts.map(post => post._id === postId ? { ...post, likes: res.data } : post));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const res = await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/unlike/${postId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      setPosts(posts.map(post => post._id === postId ? { ...post, likes: res.data } : post));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://nt-devconnector.onrender.com/api/posts/${postId}`, {
        headers: { "x-auth-token": token },
      });
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } catch (err) {
      console.error(err);
    }
  };
  const openCommentModal = (postId) => {
    setCommentModal(postId);
  };

  const closeCommentModal = () => {
    setCommentModal(null);
  };

  return (
    <div className="posts-container">
      <h1 className="post-header">Posts</h1>
      <h2 className="welcome">Welcome to the community</h2>
      <p className="post-text2">Say Something...</p>
      <form className="post-form" onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Create a post"
          className="post-input"
        ></textarea>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          <div className="post-header">
            <img src={post.avatar || "/default-avatar.png"} alt="User Avatar" className="post-avatar" />
            <h2 className="post-name">{post.name}</h2>
          </div>
          
    
          <div className="post-actions">
          <p className="post-text">{post.text}</p>
          <div className="post-data">
            <p className="post-meta">Posted on {new Date(post.date).toLocaleDateString()}</p>
          </div>
            <button className="like-btn" onClick={() => handleLike(post._id)}>👍 {post.likes.length}</button>
            <button className="unlike-btn" onClick={() => handleUnlike(post._id)}>👎</button>
            <button className="discussion-btn" onClick={() => openCommentModal(post._id)}>
              Discussion
            </button>
            {post.user === userId && <button className="delete-btn" onClick={() => handleDelete(post._id)}>❌</button>}
          </div>
        </div>
      ))}

      {commentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeCommentModal}>✖</button>
            <h2 className="modal-text">Leave a Comment</h2>
            <textarea className="comment-input" placeholder="Write a comment..."></textarea>
            <button className="comment-submit">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
