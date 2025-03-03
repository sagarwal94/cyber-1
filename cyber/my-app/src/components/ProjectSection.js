import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectSection.css';

const ProjectSection = () => {
  const { courseId, sectionType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify user is logged in
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/');
    }
  }, [navigate]);

  const handleBack = () => {
    navigate('/student-dashboard/projects');
  };

  // Sample data mapping for section types
  const sectionTitles = {
    members: 'Project Team Members',
    topic: 'Project Topic',
    proposal: 'Project Proposal',
    resources: 'Project Resources',
    discussion: 'Project Discussion'
  };

  // Handle document download (example function)
  const handleDownload = () => {
    // In a real app, this would trigger a file download
    console.log('Downloading document...');
    alert('Download started');
  };

  // Section content placeholder
  const renderSectionContent = () => {
    switch (sectionType) {
      case 'members':
        return (
          <div className="members-content">
            <h3>Team Members</h3>
            <ul className="team-list">
              <li className="team-member">
                <div className="member-info">
                  <span className="member-name">John Smith</span>
                  <span className="member-role">Team Lead</span>
                  <span className="member-id">ID: 2420100</span>
                </div>
                <div className="member-contact">john.smith@example.com</div>
              </li>
              <li className="team-member">
                <div className="member-info">
                  <span className="member-name">Sarah Johnson</span>
                  <span className="member-role">Developer</span>
                  <span className="member-id">ID: 2420101</span>
                </div>
                <div className="member-contact">sarah.j@example.com</div>
              </li>
              <li className="team-member">
                <div className="member-info">
                  <span className="member-name">Michael Lee</span>
                  <span className="member-role">Researcher</span>
                  <span className="member-id">ID: 2420102</span>
                </div>
                <div className="member-contact">m.lee@example.com</div>
              </li>
            </ul>
          </div>
        );
      
      case 'topic':
        return (
          <div className="topic-content">
            <h3>Project Topic</h3>
            <div className="topic-details">
              <h4>Secure Password Manager</h4>
              <p className="topic-description">
                Development of a secure password manager application that implements 
                industry-standard encryption techniques to store user credentials safely. 
                The application will include features such as password strength checking, 
                secure password generation, and multi-factor authentication.
              </p>
              <div className="topic-metadata">
                <span>Approved by: Dr. Williams</span>
                <span>Approval Date: January 15, 2025</span>
              </div>
            </div>
          </div>
        );
      
      case 'proposal':
        return (
          <div className="proposal-content">
            <h3>Project Proposal</h3>
            <div className="proposal-status">
              <span className="status-badge approved">Approved</span>
              <span className="submission-date">Submitted: January 10, 2025</span>
            </div>
            <div className="proposal-document">
              <h4>Document Preview</h4>
              <div className="document-preview">
                <p><strong>Abstract:</strong> This project aims to develop a secure password 
                manager application that implements AES-256 encryption...</p>
                <p><strong>Objectives:</strong></p>
                <ul>
                  <li>Implement secure credential storage using industry-standard encryption</li>
                  <li>Develop a user-friendly interface for managing passwords</li>
                  <li>Create algorithms for password strength evaluation</li>
                  <li>Implement secure password generation functionality</li>
                </ul>
                <p className="preview-note">Document truncated for preview...</p>
              </div>
              <button onClick={handleDownload} className="download-link">Download Full Proposal</button>
            </div>
          </div>
        );
      
      case 'resources':
        return (
          <div className="resources-content">
            <h3>Project Resources</h3>
            <div className="resources-list">
              <div className="resource-item">
                <h4>Project Requirements Document</h4>
                <p>Comprehensive requirements specification for the project.</p>
                <button onClick={handleDownload} className="resource-link">Download (PDF, 1.2MB)</button>
              </div>
              <div className="resource-item">
                <h4>Encryption Algorithm Documentation</h4>
                <p>Technical documentation on the encryption algorithms to be implemented.</p>
                <button onClick={handleDownload} className="resource-link">View Documentation</button>
              </div>
              <div className="resource-item">
                <h4>UI/UX Design Mockups</h4>
                <p>Preliminary designs for the application interface.</p>
                <button onClick={handleDownload} className="resource-link">View Designs</button>
              </div>
              <div className="resource-item">
                <h4>Project Timeline</h4>
                <p>Detailed timeline with milestones and deadlines.</p>
                <button onClick={handleDownload} className="resource-link">View Timeline</button>
              </div>
            </div>
          </div>
        );
      
      case 'discussion':
        return (
          <div className="discussion-content">
            <h3>Project Discussion</h3>
            <div className="discussion-thread">
              <div className="thread-message">
                <div className="message-header">
                  <span className="message-author">Dr. Williams (Supervisor)</span>
                  <span className="message-date">January 17, 2025</span>
                </div>
                <div className="message-content">
                  <p>I've reviewed your initial proposal. The concept is strong, but I'd like to see more 
                  detail on how you plan to implement the encryption functionality. Please consider 
                  adding a section on key management.</p>
                </div>
              </div>
              <div className="thread-message">
                <div className="message-header">
                  <span className="message-author">John Smith</span>
                  <span className="message-date">January 18, 2025</span>
                </div>
                <div className="message-content">
                  <p>Thank you for the feedback, Dr. Williams. We'll add more details on the encryption 
                  implementation and key management. We're considering using PBKDF2 for key derivation 
                  from the master password. Would that be appropriate?</p>
                </div>
              </div>
              <div className="thread-message">
                <div className="message-header">
                  <span className="message-author">Dr. Williams (Supervisor)</span>
                  <span className="message-date">January 19, 2025</span>
                </div>
                <div className="message-content">
                  <p>PBKDF2 is a good choice, but also consider Argon2 as it's more resistant to GPU-accelerated 
                  attacks. I'd like to see a comparison of both in your updated proposal.</p>
                </div>
              </div>
            </div>
            <div className="new-message-form">
              <textarea 
                placeholder="Type your message here..." 
                rows="4"
                className="message-input"
              ></textarea>
              <button className="send-button">Send Message</button>
            </div>
          </div>
        );
      
      default:
        return <div>Section content not available</div>;
    }
  };

  return (
    <div className="project-section-container">
      <div className="section-header">
        <button className="back-button" onClick={handleBack}>
          ← Back to Projects
        </button>
        <h2>Course {courseId}: {sectionTitles[sectionType] || sectionType}</h2>
      </div>
      
      <div className="section-content">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default ProjectSection;