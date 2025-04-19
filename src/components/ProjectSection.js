import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectSection.css';

const ProjectSection = () => {
  const { courseId, sectionType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/');
    }
  }, [navigate]);

  const handleBack = () => {
    navigate('/student-dashboard/projects');
  };

  
  const sectionTitles = {
    members: 'Project Team Members',
    topic: 'Project Topic',
    proposal: 'Project Proposal',
    resources: 'Project Resources',
    discussion: 'Project Discussion'
  };

  
  const handleDownload = () => {
    
    console.log('Downloading document...');
    alert('Download started');
  };

  
  const renderSectionContent = () => {
    switch (sectionType) {
      case 'members':
        return (
          <div className="members-content">
            <h3>Team Members</h3>
            <ul className="team-list">
              <li className="team-member">
                <div className="member-info">
                  <span className="member-name">SonalAgarwal</span>
                  <span className="member-role">Team Lead</span>
                  <span className="member-id">ID: 0000000</span>
                </div>
                <div className="member-contact">Casonalmodi94@gmail.com</div>
              </li>
              <li className="team-member">
                <div className="member-info">
                  <span className="member-name">Siva Abishikth</span>
                  <span className="member-role">Developer</span>
                  <span className="member-id">ID: 00000000</span>
                </div>
                <div className="member-contact">sivaabishikth2025@gmail.com</div>
              </li>
              <li className="team-member">
                <div className="member-info">
                  <span className="member-name">Frukan</span>
                  <span className="member-role">Researcher</span>
                  <span className="member-id">ID: 00000000</span>
                </div>
                <div className="member-contact">Frukan@example.com</div>
              </li>
            </ul>
          </div>
        );
      
      case 'topic':
        return (
          <div className="topic-content">
            <h3>Project Topic</h3>
            <div className="topic-details">
              <h4>Cyber innovation Hub</h4>
              <p className="topic-description">
                Developing a cyber innovation hub a digital platform connecting
                cybersecurity experts students and industry partners.
              </p>
              <div className="topic-metadata">
                <span>Approved by: Prof. Tsige</span>
                <span>Approval Date: March 1, 2025</span>
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
              <span className="submission-date">Submitted: March 1, 2025</span>
            </div>
            <div className="proposal-document">
              <h4>Document Preview</h4>
              <div className="document-preview">
                <p><strong>Abstract:</strong> This project aims to develop a web application
                That implements more accessiable resources to students.</p>
                <p><strong>Objectives:</strong></p>
                <ul>
                  <li>Implement secure credential storage using industry-standard encryption</li>
                  <li>Develop a user-friendly interface for managing passwords</li>
                  <li>Create algorithms for password strength evaluation</li>
                  <li>Implement secure web application to review</li>
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
                  <span className="message-author">Prof. Tsige (Supervisor)</span>
                  <span className="message-date">March 1, 2025</span>
                </div>
                <div className="message-content">
                  <p>I've reviewed your initial proposal. The concept is strong, but I'd like to see more 
                  detail on how you plan to implement the encryption functionality. Please consider 
                  adding a section on Projects.</p>
                </div>
              </div>
              <div className="thread-message">
                <div className="message-header">
                  <span className="message-author">Siva Abishikth (Developer)</span>
                  <span className="message-date">March 2, 2025</span>
                </div>
                <div className="message-content">
                  <p>Thank you for the feedback, Prof Tsige We'll add more details on the encryption 
                  implementation and key management. and We're considering using aws s3 bucket for web 
                  application sharing. Would that be appropriate?</p>
                </div>
              </div>
              <div className="thread-message">
                <div className="message-header">
                  <span className="message-author">Prof.Tsige (Supervisor)</span>
                  <span className="message-date">March 3, 2025</span>
                </div>
                <div className="message-content">
                  <p>AWS s3 bucket is a good choice, but also consider git hub
                  I'd like to see a comparison of both in your updated proposal.</p>
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