import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard({ user }) {
  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="welcome-text"> USER: {user.name}</p>
      <p className="welcome-text">EMAIL: {user.email}</p>

    </div>
  );
}

export default Dashboard;
