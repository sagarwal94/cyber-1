import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('GENERAL INFORMATION');
  const [isPersonalDetailsExpanded, setIsPersonalDetailsExpanded] = useState(true);
  const [userData, setUserData] = useState({
    studentNumber: '2420099',
    name: 'Siva Abishkth',
    lastName: 'Mylavarapu',
    studentStatus: 'Current',
    semesterStatus: 'Current',
    cgpa: '0.00',
    applicationNumber: 'APP-00116268',
    affiliatedCurriculum: '2024-2025-MS in Artificial Intelligence Engineering',
    class: 'Graduate',
    registrationDate: '12/26/2024',
    registrationSemester: '2024-2025, Spring'
  });

  // Load user data from sessionStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userString = sessionStorage.getItem('user');
        if (!userString) {
          navigate('/');
          return;
        }
        
        // In a real app, you would fetch the user's profile data from an API
        // For now, we'll use the sample data from state
      } catch (error) {
        console.error("Error loading user data:", error);
        navigate('/');
      }
    };
    
    loadUserData();
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const togglePersonalDetails = () => {
    setIsPersonalDetailsExpanded(!isPersonalDetailsExpanded);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // List of available tabs in the personal details section
  const personalDetailsTabs = [
    'GENERAL INFORMATION',
    'IDENTITY INFORMATION',
    'INTERNATIONAL STUDENT',
    'ADDRESS INFORMATION',
    'DISABILITY SERVICES',
    'UNIVERSITY INFORMATION',
    'CONTACT INFORMATION',
    'PREVIOUS EDUCATION INFORMATION',
    'DOCUMENTS',
    'MISSING DOCUMENTS'
  ];

  // Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'GENERAL INFORMATION':
        return (
          <>
            <div className="info-section">
              <h3>Student Information</h3>
              <div className="info-grid">
                <div className="info-row">
                  <div className="info-column">
                    <div className="info-label">Student Number</div>
                    <div className="info-value">{userData.studentNumber}</div>
                  </div>
                  <div className="info-column">
                    <div className="info-label">Name</div>
                    <div className="info-value">{userData.name}</div>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="info-column">
                    <div className="info-label">Last Name</div>
                    <div className="info-value">{userData.lastName}</div>
                  </div>
                  <div className="info-column">
                    <div className="info-label">Student Status</div>
                    <div className="info-value">{userData.studentStatus}</div>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="info-column">
                    <div className="info-label">Semester Status</div>
                    <div className="info-value">{userData.semesterStatus}</div>
                  </div>
                  <div className="info-column">
                    <div className="info-label">CGPA</div>
                    <div className="info-value">{userData.cgpa}</div>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="info-column">
                    <div className="info-label">Application Number</div>
                    <div className="info-value">{userData.applicationNumber}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="info-sections-container">
              <div className="info-section half-width">
                <h3>University Information</h3>
                <div className="info-grid">
                  <div className="info-row">
                    <div className="info-column full-width">
                      <div className="info-label">Affiliated Curriculum</div>
                      <div className="info-value">{userData.affiliatedCurriculum}</div>
                    </div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-column full-width">
                      <div className="info-label">Class</div>
                      <div className="info-value">{userData.class}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="info-section half-width">
                <h3>Registration Information</h3>
                <div className="info-grid">
                  <div className="info-row">
                    <div className="info-column full-width">
                      <div className="info-label">Registration Date</div>
                      <div className="info-value">{userData.registrationDate}</div>
                    </div>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-column full-width">
                      <div className="info-label">Registration Semester</div>
                      <div className="info-value">{userData.registrationSemester}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      
      case 'IDENTITY INFORMATION':
        return (
          <div className="info-section">
            <h3>Identity Information</h3>
            <p className="empty-state-message">Identity information not available.</p>
          </div>
        );
      
      // Other tab contents could be added here
      
      default:
        return (
          <div className="info-section">
            <h3>{activeTab}</h3>
            <p className="empty-state-message">Information for this section is not available.</p>
          </div>
        );
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>STUDENT PROFILE</h2>
      </div>

      <div className="profile-content">
        <div className="section-header" onClick={togglePersonalDetails}>
          <span className={`toggle-icon ${isPersonalDetailsExpanded ? 'expanded' : ''}`}>
            ▼
          </span>
          <h3>Personal Details</h3>
        </div>
        
        {isPersonalDetailsExpanded && (
          <div className="section-content">
            <div className="tabs-container">
              <div className="tabs-sidebar">
                {personalDetailsTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="tab-content">
                <h3 className="tab-title">{activeTab}</h3>
                {renderTabContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;