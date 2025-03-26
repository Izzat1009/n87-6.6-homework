import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    axios
      .post("https://nt-devconnector.onrender.com/api/auth", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        return axios.get("https://nt-devconnector.onrender.com/api/auth", {
          headers: { "x-auth-token": res.data.token },
        });
      })
      .then((res) => {
        setUser(res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); 
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Sign In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus 
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
