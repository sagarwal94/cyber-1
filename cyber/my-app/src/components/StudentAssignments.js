import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentAssignments.css';

const StudentAssignments = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedCourse, setExpandedCourse] = useState(3); // Default expanded to Course 3 as shown in design
  
  // Sample assignments data
  const assignmentsData = [
    {
      id: 1,
      name: 'Course 1',
      code: 'CMPS 514',
      color: '#8C9EFF',
      assignments: [
        {
          id: 1,
          title: 'Management Information Systems Analysis',
          dueDate: '2025-02-15',
          status: 'Submitted',
          grade: 'A (95%)',
          submissionTime: '2025-02-14T10:30:00',
          files: ['MIS_Analysis_Report.pdf'],
          comments: []
        }
      ]
    },
    {
      id: 2,
      name: 'Course 2',
      code: 'BGDA 510',
      color: '#26A69A',
      assignments: [
        {
          id: 2,
          title: 'Data Mining Project Proposal',
          dueDate: '2025-02-20',
          status: 'Not submitted',
          grade: null,
          submissionTime: null,
          files: [],
          comments: []
        }
      ]
    },
    {
      id: 3,
      name: 'Course 3',
      code: 'CMPS 570',
      color: '#B0BEC5',
      assignments: [
        {
          id: 3,
          title: 'Fundamentals of Python Coding Chapter 12',
          dueDate: '2025-02-12',
          status: 'Submitted for grading',
          grade: 'Not graded',
          submissionTime: '2025-02-11T20:40:00',
          timeRemaining: 'Assignment was submitted 5 days 3 hours early',
          files: ['Fundamentals_of_Python_Coding_Chapter_12.pdf'],
          comments: ['Comments (2)']
        }
      ]
    }
  ];

  // Load user data from sessionStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userString = sessionStorage.getItem('user');
        if (!userString) {
          navigate('/');
        }
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

  const toggleCourseExpansion = (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchKeyword);
  };

  // Filter courses based on search keyword
  const filteredCourses = searchKeyword.trim() 
    ? assignmentsData.filter(course => 
        course.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        course.assignments.some(assignment => 
          assignment.title.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    : assignmentsData;

  // Format date function
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time function
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>ASSIGNMENTS</h2>
      </div>

      <div className="search-container">
        <label className="search-label">Search Keyword :</label>
        <div className="search-input-container">
          <input 
            type="text" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
          />
          <button 
            className="search-button" 
            onClick={handleSearch}
            aria-label="Search"
          >
            <span role="img" aria-hidden="true">🔍</span>
          </button>
        </div>
      </div>

      <div className="assignments-list">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div 
              className="course-header"
              onClick={() => toggleCourseExpansion(course.id)}
            >
              <div className="course-color-block" style={{ backgroundColor: course.color }}></div>
              <h3 className="course-name">{course.name}</h3>
              <span className="toggle-icon">
                {expandedCourse === course.id ? '▼' : '▶'}
              </span>
            </div>
            
            {expandedCourse === course.id && course.assignments.length > 0 && (
              <div className="assignment-details">
                {course.assignments.map(assignment => (
                  <div key={assignment.id} className="assignment-info">
                    {assignment.status === 'Submitted for grading' && (
                      <table className="assignment-table">
                        <tbody>
                          <tr>
                            <td className="info-label">Submission status</td>
                            <td className="info-value status-submitted">{assignment.status}</td>
                          </tr>
                          <tr>
                            <td className="info-label">Grading status</td>
                            <td className="info-value">{assignment.grade}</td>
                          </tr>
                          <tr>
                            <td className="info-label">Time remaining</td>
                            <td className="info-value status-submitted">{assignment.timeRemaining}</td>
                          </tr>
                          <tr>
                            <td className="info-label">Last modified</td>
                            <td className="info-value">
                              {assignment.submissionTime && (
                                `${formatDate(assignment.submissionTime).split(',')[1].trim()}, ${formatTime(assignment.submissionTime)}`
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="info-label">File submissions</td>
                            <td className="info-value">
                              {assignment.files.map((file, index) => (
                                <div key={index} className="file-submission">
                                  <span className="file-icon">📄</span>
                                  <a href="#" className="file-link">{file}</a>
                                </div>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td className="info-label">Submission comments</td>
                            <td className="info-value">
                              {assignment.comments.length > 0 ? (
                                <div className="comment-section">
                                  <span className="comment-icon">💬</span>
                                  <a href="#" className="comment-link">{assignment.comments[0]}</a>
                                </div>
                              ) : (
                                'No comments'
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                    
                    {assignment.status !== 'Submitted for grading' && (
                      <div className="assignment-summary">
                        <h4 className="assignment-title">{assignment.title}</h4>
                        <div className="assignment-meta">
                          <span className="due-date">Due: {formatDate(assignment.dueDate)}</span>
                          <span className={`status-badge ${assignment.status === 'Submitted' ? 'submitted' : 'pending'}`}>
                            {assignment.status}
                          </span>
                        </div>
                        {assignment.grade && (
                          <div className="grade-info">Grade: {assignment.grade}</div>
                        )}
                        <div className="assignment-actions">
                          <button className="view-button">View Assignment</button>
                          {assignment.status !== 'Submitted' && (
                            <button className="submit-button">Submit Assignment</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignments;