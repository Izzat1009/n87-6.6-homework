import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Posts from "./components/pages/Posts";
import Dashboard from "./components/pages/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://nt-devconnector.onrender.com/api/auth", {
          headers: { "x-auth-token": token },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="header">
        <Link to="/register">Register</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/posts">Posts</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      <Routes>
        <Route element={<Login setUser={setUser} />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Posts />} path="/posts" />
        <Route element={<Dashboard user={user} />} path="/dashboard" />
      </Routes>
    </>
  );
}

export default App;
