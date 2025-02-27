import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  const studentData = {
    name: "Siva",
    id: "2420099",
    profilePic: "https://via.placeholder.com/50" 
};

  const handleLogout = () => {
    
    navigate('/');
  };

  const menuItems = [
    { name: 'Home 🏠', link: '#' },
    { name: 'FORUM', link: '#' },
    { name: 'BLOGS', link: '#' },
    { name: 'ATTENDANCE', link: '/student-dashboard/attendance' },
    { name: 'COURSES', link: '#' },
    { name: 'E-LIBRARY', link: '#' },
    { name: 'DISCUSSION PAGE', link: '#' },
    { name: 'RESOURCES', link: '#' },
    { name: 'PROJECTS', link: '#' },
    { name: 'PROFILE', link: '#' },
    { name: 'TIMETABLE', link: '#' },
    { name: 'GRADES', link: '#' },
    { name: 'ASSIGNMENTS', link: '#' },
    { name: 'SUPPORT', link: '#' }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img public="/images/background.jpg" alt="BAU Logo" className="header-logo" />
          <h1>Cyber Edge Innovation Hub</h1>
        </div>
        <div className="header-right">
          <div className="profile-section">
            <img src={studentData.profilePic} alt="Profile" className="profile-pic" />
            <div className="profile-info">
              <p>Hi.. {studentData.name}</p>
              <p>({studentData.id})</p>
              <button onClick={() => navigate('/change-password')}>Change Password</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <nav className="sidebar">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link} className="menu-item">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Main content area */}
        <main className="main-content">
          <h2>Latest Updates</h2>
          <div className="news-card">
            <h3>FDA Identifies Cybersecurity Risks in Patient Monitors</h3>
            <p>On January 30, 2025, the U.S. Food and Drug Administration (FDA) highlighted cybersecurity
            vulnerabilities in certain patient monitors produced by Contec and Epsimed. These devices, which
            display vital signs like temperature and blood pressure, are susceptible to unauthorized access.</p>
            <p>Potential risks include manipulation or remote control of the monitors, leading to malfunctions, 
            and the compromise of connected networks, possibly exposing sensitive patient information.</p>
            <p>The FDA has advised healthcare facilities to implement measures to mitigate these risks.</p>
            <a href="https://reuters.com" target="_blank" rel="noopener noreferrer">Source: Reuters</a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;