import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css"; // ✅ CSS faylni import qildik

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://nt-devconnector.onrender.com/api/posts", {
        headers: { "x-auth-token": token },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          <img
            className="post-avatar"
            src={post.avatar || "https://via.placeholder.com/60"}
            alt="User Avatar"
          />
          <div className="post-content">
            <h2 className="post-name">{post.name}</h2>
            <p className="post-text">{post.text}</p>
            <p className="post-meta">Posted on {new Date(post.date).toLocaleDateString()}</p>
          </div>
          <Link className="discussion-link" to={`/posts/${post._id}`}>
            Discussion
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
