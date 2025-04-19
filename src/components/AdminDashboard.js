import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import SupportChatbot from '../components/SupportChatbot';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    id: "",
    type: ""
  });
  
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    activeDiscussions: 0,
    pendingApprovals: 0
  });
  
  useEffect(() => {
    // Load user data from session storage
    const loadUserData = () => {
      try {
        const userString = sessionStorage.getItem('user');
        
        if (userString) {
          const user = JSON.parse(userString);
          
          // Verify this is an admin user
          if (user.type !== 'admin') {
            navigate('/');
            return;
          }
          
          setUserData({
            name: user.name || "Admin",
            id: user.id || "ID not found",
            type: user.type
          });
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        navigate('/');
      }
    };
    
    // Load mock data for the admin dashboard
    const loadMockData = () => {
      // Mock student data
      const mockStudents = [
        { id: '2420099', name: 'Siva Abishikth', department: 'Computer Science', semester: 'Fall 2024', status: 'Active' },
        { id: '2420100', name: 'Alex Johnson', department: 'Cybersecurity', semester: 'Fall 2024', status: 'Active' },
        { id: '2420101', name: 'Maria Garcia', department: 'Information Technology', semester: 'Fall 2024', status: 'Inactive' },
        { id: '2420102', name: 'John Smith', department: 'Artificial Intelligence', semester: 'Spring 2025', status: 'Active' },
        { id: '2420103', name: 'Sarah Wilson', department: 'Data Science', semester: 'Spring 2025', status: 'Pending' }
      ];
      
      // Mock course data
      const mockCourses = [
        { id: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. John Smith', students: 42, department: 'Computer Science' },
        { id: 'CS202', name: 'Data Structures and Algorithms', instructor: 'Dr. Jane Doe', students: 38, department: 'Computer Science' },
        { id: 'CYB303', name: 'Network Security', instructor: 'Prof. Robert Johnson', students: 25, department: 'Cybersecurity' },
        { id: 'AI404', name: 'Machine Learning Fundamentals', instructor: 'Dr. Lisa Chen', students: 30, department: 'Artificial Intelligence' },
        { id: 'IT505', name: 'Database Management Systems', instructor: 'Dr. Michael Brown', students: 35, department: 'Information Technology' }
      ];
      
      // Set mock data
      setStudents(mockStudents);
      setCourses(mockCourses);
      setStats({
        totalStudents: mockStudents.length,
        totalCourses: mockCourses.length,
        activeDiscussions: 12,
        pendingApprovals: 3
      });
    };
    
    loadUserData();
    loadMockData();
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };
  
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  
  const renderDashboardContent = () => {
    return (
      <div className="dashboard-content">
        <h3>Dashboard Overview</h3>
        
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon students-icon">👨‍🎓</div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalStudents}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon courses-icon">📚</div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalCourses}</span>
              <span className="stat-label">Active Courses</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon discussions-icon">💬</div>
            <div className="stat-info">
              <span className="stat-value">{stats.activeDiscussions}</span>
              <span className="stat-label">Active Discussions</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon approvals-icon">✅</div>
            <div className="stat-info">
              <span className="stat-value">{stats.pendingApprovals}</span>
              <span className="stat-label">Pending Approvals</span>
            </div>
          </div>
        </div>
        
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">🔔</div>
              <div className="activity-details">
                <span className="activity-text">New student registered: Sarah Wilson</span>
                <span className="activity-time">Today, 10:45 AM</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-details">
                <span className="activity-text">Course schedule updated for CS101</span>
                <span className="activity-time">Yesterday, 2:30 PM</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">📊</div>
              <div className="activity-details">
                <span className="activity-text">Attendance report generated for February</span>
                <span className="activity-time">Feb 28, 2025</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">🔍</div>
              <div className="activity-details">
                <span className="activity-text">System maintenance scheduled for March 15</span>
                <span className="activity-time">Feb 25, 2025</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-container">
            <button className="action-button">Add New Student</button>
            <button className="action-button">Create Course</button>
            <button className="action-button">Generate Reports</button>
            <button className="action-button">System Settings</button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderStudentsContent = () => {
    return (
      <div className="students-content">
        <h3>Student Management</h3>
        
        <div className="actions-bar">
          <div className="search-container">
            <input type="text" placeholder="Search students..." className="search-input" />
            <button className="search-button">Search</button>
          </div>
          
          <div className="filter-container">
            <select className="filter-select">
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Data Science">Data Science</option>
            </select>
            
            <select className="filter-select">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <button className="add-button">Add Student</button>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.semester}</td>
                  <td>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button">Edit</button>
                      <button className="view-button">View</button>
                      <button className="delete-button">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <button className="page-button">Previous</button>
          <span className="page-indicator">Page 1 of 1</span>
          <button className="page-button">Next</button>
        </div>
      </div>
    );
  };
  
  const renderCoursesContent = () => {
    return (
      <div className="courses-content">
        <h3>Course Management</h3>
        
        <div className="actions-bar">
          <div className="search-container">
            <input type="text" placeholder="Search courses..." className="search-input" />
            <button className="search-button">Search</button>
          </div>
          
          <div className="filter-container">
            <select className="filter-select">
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          
          <button className="add-button">Add Course</button>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Department</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.instructor}</td>
                  <td>{course.department}</td>
                  <td>{course.students}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button">Edit</button>
                      <button className="view-button">View</button>
                      <button className="delete-button">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <button className="page-button">Previous</button>
          <span className="page-indicator">Page 1 of 1</span>
          <button className="page-button">Next</button>
        </div>
      </div>
    );
  };
  
  const renderAttendanceContent = () => {
    return (
      <div className="attendance-content">
        <h3>Attendance Management</h3>
        
        <div className="attendance-filters">
          <div className="filter-group">
            <label>Course:</label>
            <select className="filter-select">
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Date Range:</label>
            <input type="date" className="date-input" />
            <span>to</span>
            <input type="date" className="date-input" />
          </div>
          
          <button className="generate-button">Generate Report</button>
        </div>
        
        <div className="attendance-summary">
          <div className="summary-card">
            <h4>Overall Attendance</h4>
            <div className="chart-placeholder">
              <div className="pie-chart">
                <div className="pie-segment" style={{ transform: 'rotate(0deg)', backgroundColor: '#4CAF50', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)' }}></div>
                <div className="pie-segment" style={{ transform: 'rotate(180deg)', backgroundColor: '#FF5722', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 30%, 0% 30%, 0% 0%, 50% 0%)' }}></div>
                <div className="pie-center">85%</div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
                <span>Present (85%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FF5722' }}></span>
                <span>Absent (15%)</span>
              </div>
            </div>
          </div>
          
          <div className="summary-card">
            <h4>Attendance Trends</h4>
            <div className="chart-placeholder">
              <div className="bar-chart">
                <div className="bar-container">
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar-label">Mon</div>
                </div>
                <div className="bar-container">
                  <div className="bar" style={{ height: '85%' }}></div>
                  <div className="bar-label">Tue</div>
                </div>
                <div className="bar-container">
                  <div className="bar" style={{ height: '75%' }}></div>
                  <div className="bar-label">Wed</div>
                </div>
                <div className="bar-container">
                  <div className="bar" style={{ height: '90%' }}></div>
                  <div className="bar-label">Thu</div>
                </div>
                <div className="bar-container">
                  <div className="bar" style={{ height: '65%' }}></div>
                  <div className="bar-label">Fri</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <h4>Recent Attendance Records</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Date</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Percentage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CS101 - Introduction to Computer Science</td>
                <td>March 1, 2025</td>
                <td>38</td>
                <td>4</td>
                <td>90.5%</td>
                <td>
                  <button className="view-button">View Details</button>
                </td>
              </tr>
              <tr>
                <td>CS202 - Data Structures and Algorithms</td>
                <td>February 28, 2025</td>
                <td>32</td>
                <td>6</td>
                <td>84.2%</td>
                <td>
                  <button className="view-button">View Details</button>
                </td>
              </tr>
              <tr>
                <td>CYB303 - Network Security</td>
                <td>February 28, 2025</td>
                <td>21</td>
                <td>4</td>
                <td>84.0%</td>
                <td>
                  <button className="view-button">View Details</button>
                </td>
              </tr>
              <tr>
                <td>AI404 - Machine Learning Fundamentals</td>
                <td>February 27, 2025</td>
                <td>28</td>
                <td>2</td>
                <td>93.3%</td>
                <td>
                  <button className="view-button">View Details</button>
                </td>
              </tr>
              <tr>
                <td>IT505 - Database Management Systems</td>
                <td>February 27, 2025</td>
                <td>30</td>
                <td>5</td>
                <td>85.7%</td>
                <td>
                  <button className="view-button">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderDiscussionsContent = () => {
    return (
      <div className="discussions-content">
        <h3>Discussion Forums Management</h3>
        
        <div className="actions-bar">
          <div className="search-container">
            <input type="text" placeholder="Search discussions..." className="search-input" />
            <button className="search-button">Search</button>
          </div>
          
          <div className="filter-container">
            <select className="filter-select">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          
          <button className="add-button">Create Forum</button>
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Created By</th>
                <th>Date</th>
                <th>Participants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cybersecurity Ethics in Modern Environments</td>
                <td>Siva Abishikth</td>
                <td>Jan 15, 2025</td>
                <td>12</td>
                <td><span className="status-badge active">Active</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="edit-button">Edit</button>
                    <button className="archive-button">Archive</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Machine Learning Applications in Network Security</td>
                <td>Alex Johnson</td>
                <td>Jan 20, 2025</td>
                <td>8</td>
                <td><span className="status-badge done">Completed</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="edit-button">Edit</button>
                    <button className="archive-button">Archive</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Cloud Computing Security Challenges</td>
                <td>Maria Garcia</td>
                <td>Feb 5, 2025</td>
                <td>15</td>
                <td><span className="status-badge active">Active</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="edit-button">Edit</button>
                    <button className="archive-button">Archive</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Blockchain Technology in Cybersecurity</td>
                <td>John Smith</td>
                <td>Feb 12, 2025</td>
                <td>10</td>
                <td><span className="status-badge active">Active</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="edit-button">Edit</button>
                    <button className="archive-button">Archive</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Ethical Hacking Best Practices</td>
                <td>Sarah Wilson</td>
                <td>Feb 18, 2025</td>
                <td>6</td>
                <td><span className="status-badge archived">Archived</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button">View</button>
                    <button className="restore-button">Restore</button>
                    <button className="delete-button">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderReportsContent = () => {
    return (
      <div className="reports-content">
        <h3>Reports & Analytics</h3>
        
        <div className="report-types">
          <div className="report-type-card">
            <div className="report-icon">📊</div>
            <h4>Attendance Reports</h4>
            <p>Generate attendance reports by course, department, or date range.</p>
            <button className="generate-button">Generate</button>
          </div>
          
          <div className="report-type-card">
            <div className="report-icon">📈</div>
            <h4>Student Performance</h4>
            <p>Analyze student performance metrics and trends.</p>
            <button className="generate-button">Generate</button>
          </div>
          
          <div className="report-type-card">
            <div className="report-icon">🎓</div>
            <h4>Course Statistics</h4>
            <p>View detailed statistics for each course.</p>
            <button className="generate-button">Generate</button>
          </div>
          
          <div className="report-type-card">
            <div className="report-icon">📝</div>
            <h4>Custom Report</h4>
            <p>Create a custom report with selected parameters.</p>
            <button className="generate-button">Configure</button>
          </div>
        </div>
        
        <div className="recent-reports">
          <h4>Recently Generated Reports</h4>
          <ul className="reports-list">
            <li className="report-item">
              <div className="report-details">
                <span className="report-name">Attendance Report - CS101</span>
                <span className="report-date">March 2, 2025</span>
              </div>
              <div className="report-actions">
                <button className="download-button">Download</button>
                <button className="view-button">View</button>
              </div>
            </li>
            
            <li className="report-item">
              <div className="report-details">
                <span className="report-name">Student Performance - Cybersecurity Department</span>
                <span className="report-date">February 28, 2025</span>
              </div>
              <div className="report-actions">
                <button className="download-button">Download</button>
                <button className="view-button">View</button>
              </div>
            </li>
            
            <li className="report-item">
              <div className="report-details">
                <span className="report-name">Course Completion Rates - Spring 2025</span>
                <span className="report-date">February 25, 2025</span>
              </div>
              <div className="report-actions">
                <button className="download-button">Download</button>
                <button className="view-button">View</button>
              </div>
            </li>
            
            <li className="report-item">
              <div className="report-details">
                <span className="report-name">Monthly System Usage Statistics</span>
                <span className="report-date">February 1, 2025</span>
              </div>
              <div className="report-actions">
                <button className="download-button">Download</button>
                <button className="view-button">View</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  const renderSettingsContent = () => {
    return (
      <div className="settings-content">
        <h3>System Settings</h3>
        
        <div className="settings-container">
          <div className="settings-section">
            <h4>General Settings</h4>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Institution Name</label>
                <input type="text" value="Bay Atlantic University" className="settings-input" />
              </div>
              
              <div className="form-group">
                <label>Academic Year</label>
                <select className="settings-select">
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Current Semester</label>
                <select className="settings-select">
                  <option value="Fall 2024">Fall 2024</option>
                  <option value="Spring 2025">Spring 2025</option>
                  <option value="Summer 2025">Summer 2025</option>
                </select>
              </div>
              
              <div className="form-group checkbox-group">
                <input type="checkbox" id="maintenanceMode" />
                <label htmlFor="maintenanceMode">Maintenance Mode</label>
              </div>
            </div>
          </div>
          
          <div className="settings-section">
            <h4>Notification Settings</h4>
            
            <div className="settings-form">
              <div className="form-group checkbox-group">
                <input type="checkbox" id="emailNotifications" defaultChecked />
                <label htmlFor="emailNotifications">Email Notifications</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input type="checkbox" id="smsNotifications" />
                <label htmlFor="smsNotifications">SMS Notifications</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input type="checkbox" id="systemAlerts" defaultChecked />
                <label htmlFor="systemAlerts">System Alerts</label>
              </div>
              
              <div className="form-group">
                <label>Default Notification Email</label>
                <input type="email" defaultValue="admin@bau.edu" className="settings-input" />
              </div>
            </div>
          </div>
          
          <div className="settings-section">
            <h4>Security Settings</h4>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Password Expiry (days)</label>
                <input type="number" defaultValue="90" className="settings-input" />
              </div>
              
              <div className="form-group">
                <label>Session Timeout (minutes)</label>
                <input type="number" defaultValue="30" className="settings-input" />
              </div>
              
              <div className="form-group checkbox-group">
                <input type="checkbox" id="twoFactorAuth" defaultChecked />
                <label htmlFor="twoFactorAuth">Two-Factor Authentication</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input type="checkbox" id="loginAttempts" defaultChecked />
                <label htmlFor="loginAttempts">Limit Login Attempts</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-actions">
          <button className="save-button">Save Changes</button>
          <button className="reset-button">Reset to Default</button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <div className="header-left">
          <img src="/images/Bau-logo.jpg" alt="BAU Logo" className="header-logo" />
          <h1>Admin Control Panel</h1>
        </div>
        <div className="header-right">
          <div className="profile-section">
            <img src="/images/admin-profile.jpg" alt="Admin Profile" className="profile-pic" />
            <div className="profile-info">
              <p>Welcome, {userData.name}</p>
              <p>Admin ID: {userData.id}</p>
              <button onClick={() => navigate('/change-password')}>Change Password</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="admin-dashboard-content">
        <nav className="admin-sidebar">
          <ul className="admin-menu">
            <li className={`admin-menu-item ${activeSection === 'dashboard' ? 'active' : ''}`}>
              <button onClick={() => handleSectionChange('dashboard')}>
                <span className="menu-icon">📊</span>
                <span>Dashboard</span>
              </button>
            </li>
            <li className={`admin-menu-item ${activeSection === 'students' ? 'active' : ''}`}>
              <button onClick={() => handleSectionChange('students')}>
                <span className="menu-icon">👨‍🎓</span>
                <span>Students</span>
              </button>
            </li>
            <li className={`admin-menu-item ${activeSection === 'courses' ? 'active' : ''}`}>
              <button onClick={() => handleSectionChange('courses')}>
                <span className="menu-icon">📚</span>
                <span>Courses</span>
              </button>
            </li>
            <li className={`admin-menu-item ${activeSection === 'attendance' ? 'active' : ''}`}>
              <button onClick={() => handleSectionChange('attendance')}>
                <span className="menu-icon">📋</span>
                <span>Attendance</span>
              </button>
            </li>
            <li className={`admin-menu-item ${activeSection === 'discussions' ? 'active' : ''}`}>
              <button onClick={() => handleSectionChange('discussions')}>
                <span className="menu-icon">💬</span>
                <span>Discussions</span>
              </button>
            </li>
            <li className={`admin-menu-item ${activeSection === 'reports' ? 'active' : ''}`}>
              <button onClick={() => handleSectionChange('reports')}>
                <span className="menu-icon">📈</span>
                <span>Reports</span>
              </button>
            </li>
            <li className={`admin-menu-item ${activeSection === 'settings' ? 'active' : ''}`}>
              <button onClick={() => handleSectionChange('settings')}>
                <span className="menu-icon">⚙️</span>
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <main className="admin-main-content">
          {activeSection === 'dashboard' && renderDashboardContent()}
          {activeSection === 'students' && renderStudentsContent()}
          {activeSection === 'courses' && renderCoursesContent()}
          {activeSection === 'attendance' && renderAttendanceContent()}
          {activeSection === 'discussions' && renderDiscussionsContent()}
          {activeSection === 'reports' && renderReportsContent()}
          {activeSection === 'settings' && renderSettingsContent()}
        </main>
      </div>
      
      <SupportChatbot />
    </div>
  );
};

export default AdminDashboard;