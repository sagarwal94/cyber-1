import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import SupportChatbot from './SupportChatbot';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    id: "",
    profilePic: "https://via.placeholder.com/50"
  });
  
  // Load user data from sessionStorage on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Get user data from sessionStorage
        const userString = sessionStorage.getItem('user');
        
        if (userString) {
          const user = JSON.parse(userString);
          console.log("User data loaded:", user);
          
          setUserData({
            name: user.name || "Student",
            id: user.id || "ID not found",
            profilePic: "https://via.placeholder.com/50" // Default profile pic
          });
        } else {
          console.log("No user data found in session storage");
          // Redirect to login if no user data is found
          navigate('/');
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        // Redirect to login if there's an error loading user data
        navigate('/');
      }
    };
    
    loadUserData();
  }, [navigate]);
  
  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem('user');
    // Navigate to login page
    navigate('/');
  };
  
  const menuItems = [
    { name: 'Home 🏠', link: '/student-dashboard' },
    { name: 'FORUM', link: '#' },
    { name: 'BLOGS', link: '#' },
    { name: 'ATTENDANCE', link: '/student-dashboard/attendance' },
    { name: 'COURSES', link: '/student-dashboard/courses' },
    { name: 'E-LIBRARY', link: '/student-dashboard/library' },
    { name: 'DISCUSSION PAGE', link: '/student-dashboard/discussions' },
    { name: 'RESOURCES', link: '/student-dashboard/resources' },
    { name: 'PROJECTS', link: '/student-dashboard/projects' },
    { name: 'PROFILE', link: '/student-dashboard/profile' },
    { name: 'TIMETABLE', link: '/student-dashboard/schedule' },
    { name: 'GRADES', link: '/student-dashboard/grades' },
    { name: 'ASSIGNMENTS', link: '/student-dashboard/assignments' },
    { name: 'SUPPORT', link: '#' }
  ];
  
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/images/Bau-logo.jpg" alt="BAU Logo" className="header-logo" />
          <h1>Cyber Edge Innovation Hub</h1>
        </div>
        <div className="header-right">
          <div className="profile-section">
            <img src="/images/profile-pic.jpg" alt="Profile" className="profile-pic" />
            <div className="profile-info">
              <p>Hi.. {userData.name}</p>
              <p>({userData.id})</p>
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

      {/* Support Chatbot */}
      <SupportChatbot />
    </div>
  );
};

export default StudentDashboard;