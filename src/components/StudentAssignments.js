import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentAssignments.css';

const StudentAssignments = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedCourse, setExpandedCourse] = useState(3); 
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    courseId: '',
    title: '',
    description: '',
    dueDate: '',
    dueTime: '23:59',
    totalPoints: '100',
    instructions: '',
    attachmentRequired: false,
    submissionType: 'Document',
    visibleToStudents: true
  });
  
  
  const courses = [
    {
      id: 1,
      name: 'Course 1',
      code: 'CMPS 514',
      color: '#8C9EFF',
      instructor: 'Dr. John Smith',
      credit: 3
    },
    {
      id: 2,
      name: 'Course 2',
      code: 'BGDA 510',
      color: '#26A69A',
      instructor: 'Dr. Jane Doe',
      credit: 3
    },
    {
      id: 3,
      name: 'Course 3',
      code: 'CMPS 570',
      color: '#B0BEC5',
      instructor: 'Dr. Robert Johnson',
      credit: 3
    }
  ];
  
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
    console.log('Searching for:', searchKeyword);
  };

  const filteredCourses = searchKeyword.trim() 
    ? assignmentsData.filter(course => 
        course.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        course.assignments.some(assignment => 
          assignment.title.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    : assignmentsData;

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleCreateAssignmentClick = () => {
    setShowCreateAssignmentModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateAssignmentModal(false);
    setNewAssignment({
      courseId: '',
      title: '',
      description: '',
      dueDate: '',
      dueTime: '23:59',
      totalPoints: '100',
      instructions: '',
      attachmentRequired: false,
      submissionType: 'Document',
      visibleToStudents: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAssignment({
      ...newAssignment,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCreateAssignment = () => {
    
    if (!newAssignment.courseId || !newAssignment.title || !newAssignment.dueDate) {
      alert('Please fill in all required fields (Course, Title, Due Date)');
      return;
    }

  
    const courseIndex = assignmentsData.findIndex(course => course.id.toString() === newAssignment.courseId);
    if (courseIndex === -1) {
      alert('Course not found');
      return;
    }

    
    const newAssignmentObj = {
      id: Date.now(), 
      title: newAssignment.title,
      dueDate: newAssignment.dueDate,
      status: 'Not submitted',
      grade: null,
      submissionTime: null,
      files: [],
      comments: [],
      description: newAssignment.description,
      instructions: newAssignment.instructions,
      totalPoints: newAssignment.totalPoints,
      submissionType: newAssignment.submissionType,
      attachmentRequired: newAssignment.attachmentRequired,
      visibleToStudents: newAssignment.visibleToStudents
    };

    
    console.log('New assignment created:', newAssignmentObj);
    
    
    handleCloseModal();
    
    
    alert('Assignment created successfully!');
    
    
    setExpandedCourse(parseInt(newAssignment.courseId));
  };

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>ASSIGNMENTS</h2>
      </div>

      <div className="create-assignment-container">
        <button 
          className="create-assignment-button"
          onClick={handleCreateAssignmentClick}
          style={{
            backgroundColor: "#192f5d",
            color: "white"
          }}
        >
          Create Assignment
        </button>
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
            style={{
              backgroundColor: "#192f5d",
              color: "white"
            }}
          >
            <span role="img" aria-hidden="true">🔍</span>
          </button>
        </div>
      </div>

      <div className="assignments-list">
        {filteredCourses.map((course) => (
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
                {course.assignments.map((assignment) => (
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

    
      {showCreateAssignmentModal && (
        <div className="modal-overlay">
          <div className="modal-container assignment-modal">
            <div className="modal-header">
              <h3>Create New Assignment</h3>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <form className="assignment-form">
                <div className="form-group">
                  <label htmlFor="courseId">Course: <span className="required">*</span></label>
                  <select
                    id="courseId"
                    name="courseId"
                    value={newAssignment.courseId}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="title">Assignment Title: <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={newAssignment.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter assignment title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description: <span className="required">*</span></label>
                  <textarea 
                    id="description" 
                    name="description"
                    value={newAssignment.description}
                    onChange={handleInputChange}
                    className="form-input textarea"
                    rows="3"
                    placeholder="Brief description of the assignment"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dueDate">Due Date: <span className="required">*</span></label>
                    <input 
                      type="date" 
                      id="dueDate" 
                      name="dueDate"
                      value={newAssignment.dueDate}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="dueTime">Due Time:</label>
                    <input 
                      type="time" 
                      id="dueTime" 
                      name="dueTime"
                      value={newAssignment.dueTime}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="totalPoints">Total Points:</label>
                  <input 
                    type="number" 
                    id="totalPoints" 
                    name="totalPoints"
                    value={newAssignment.totalPoints}
                    onChange={handleInputChange}
                    className="form-input"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instructions">Detailed Instructions:</label>
                  <textarea 
                    id="instructions" 
                    name="instructions"
                    value={newAssignment.instructions}
                    onChange={handleInputChange}
                    className="form-input textarea"
                    rows="5"
                    placeholder="Detailed instructions for completing the assignment"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="submissionType">Submission Type:</label>
                  <select
                    id="submissionType"
                    name="submissionType"
                    value={newAssignment.submissionType}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Document">Document</option>
                    <option value="Code">Code</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Online Text">Online Text</option>
                    <option value="Multiple Files">Multiple Files</option>
                  </select>
                </div>

                <div className="form-row checkbox-row">
                  <div className="form-group checkbox-group">
                    <input 
                      type="checkbox" 
                      id="attachmentRequired" 
                      name="attachmentRequired"
                      checked={newAssignment.attachmentRequired}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="attachmentRequired">Require Attachment</label>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input 
                      type="checkbox" 
                      id="visibleToStudents" 
                      name="visibleToStudents"
                      checked={newAssignment.visibleToStudents}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="visibleToStudents">Visible to Students</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              <button 
                className="create-button" 
                onClick={handleCreateAssignment}
                style={{
                  backgroundColor: "#192f5d",
                  color: "white"
                }}
              >
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;