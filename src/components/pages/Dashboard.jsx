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
      <p className="welcome-text">👤 Welcome {user.name}</p>

      <div className="dashboard-actions">
        <Link className="btn edit-profile" to="/edit-profile">Edit Profile</Link>
        <button className="btn add-experience">➕ Add Experience</button>
        <button className="btn add-education">🎓 Add Education</button>
      </div>

      <div className="credentials">
        <h2>Experience Credentials</h2>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>
            {user.experience && user.experience.length > 0 ? (
              user.experience.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.company}</td>
                  <td>{exp.title}</td>
                  <td>{exp.from.substring(0, 4)} - {exp.to ? exp.to.substring(0, 4) : "Present"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No experience added</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Education Credentials</h2>
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>
            {user.education && user.education.length > 0 ? (
              user.education.map((edu) => (
                <tr key={edu._id}>
                  <td>{edu.school}</td>
                  <td>{edu.degree}</td>
                  <td>{edu.from.substring(0, 4)} - {edu.to ? edu.to.substring(0, 4) : "Present"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No education added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="btn delete-account">❌ Delete My Account</button>
    </div>
  );
}

export default Dashboard;
