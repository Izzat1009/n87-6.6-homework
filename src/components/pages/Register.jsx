import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // ✅ Stilni import qildik

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://nt-devconnector.onrender.com/api/users", {
        name,
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/posts"); // ✅ Register tugagach, Posts sahifasiga o'tish
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="container">
      <div>
        <h2 className="heading">Sign Up</h2>
        <p className="sub-heading">
          <i className="fa-solid fa-user"></i>
          Create Your Account
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>

      <a className="signin-link" onClick={() => navigate("/login")} href="#">
        Sign In
      </a>
    </div>
  );
}

export default Register;
