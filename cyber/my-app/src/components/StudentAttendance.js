import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentAttendance.css';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expandedCourseIds, setExpandedCourseIds] = useState({}); // Change to object
  const [showCumulativeData, setShowCumulativeData] = useState(false);
  const [cumulativeData, setCumulativeData] = useState(null);
  
  // Sample courses data
  const courses = [
    { 
      id: 1, 
      name: 'Course 1', 
      date: '27/01/2025',
      attendanceData: [
        { date: '10/01/2025', status: 'Present', time: '10:00 AM' },
        { date: '17/01/2025', status: 'Absent', time: '10:00 AM' },
        { date: '24/01/2025', status: 'Present', time: '10:00 AM' }
      ] 
    },
    { 
      id: 2, 
      name: 'Course 2', 
      date: '28/01/2025',
      attendanceData: [
        { date: '11/01/2025', status: 'Present', time: '2:00 PM' },
        { date: '18/01/2025', status: 'Present', time: '2:00 PM' },
        { date: '25/01/2025', status: 'Present', time: '2:00 PM' }
      ]
    },
    { 
      id: 3, 
      name: 'Course 3', 
      date: '31/01/2025',
      attendanceData: [
        { date: '14/01/2025', status: 'Absent', time: '9:00 AM' },
        { date: '21/01/2025', status: 'Present', time: '9:00 AM' },
        { date: '28/01/2025', status: 'Present', time: '9:00 AM' }
      ]
    }
  ];
  
  // Monthly cumulative data mapping (sample data)
  const monthlyData = {
    'Jan-2025': {
      totalClasses: 36,
      attended: 28,
      percentage: 77.8,
      courseWiseData: [
        { course: 'Course 1', total: 12, attended: 10, percentage: 83.3 },
        { course: 'Course 2', total: 12, attended: 11, percentage: 91.7 },
        { course: 'Course 3', total: 12, attended: 7, percentage: 58.3 }
      ]
    },
    'Feb-2025': {
      totalClasses: 36,
      attended: 32,
      percentage: 88.9,
      courseWiseData: [
        { course: 'Course 1', total: 12, attended: 11, percentage: 91.7 },
        { course: 'Course 2', total: 12, attended: 12, percentage: 100 },
        { course: 'Course 3', total: 12, attended: 9, percentage: 75 }
      ]
    }
  };
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const years = [2020, 2021, 2022, 2023, 2024, 2025]; 
  
  // Toggle course details visibility
  const toggleCourseDetails = (courseId) => {
    setExpandedCourseIds(prevState => {
      const newState = { ...prevState };
      newState[courseId] = !newState[courseId];
      return newState;
    });
  };
  
  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };
  
  const showMonthlyData = () => {
    if (!selectedMonth || selectedMonth === '-Month-') {
      alert('Please select a month');
      return;
    }
    
    const key = `${selectedMonth}-${selectedYear}`;
    if (monthlyData[key]) {
      setCumulativeData(monthlyData[key]);
      setShowCumulativeData(true);
    } else {
      // If no data exists for the selected month and year
      setCumulativeData({
        totalClasses: 0,
        attended: 0,
        percentage: 0,
        courseWiseData: []
      });
      setShowCumulativeData(true);
    }
  };
  
  // Log state for debugging
  useEffect(() => {
    console.log("Expanded course IDs:", expandedCourseIds);
  }, [expandedCourseIds]);
  
  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>STUDENT ATTENDANCE</h2>
      </div>
      
      <div className="attendance-filters">
        <div className="filter-group">
          <label>Month/Year:</label>
          <select 
            value={selectedMonth} 
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setShowCumulativeData(false);
            }}
            className="month-select"
          >
            <option value="">-Month-</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select 
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setShowCumulativeData(false);
            }}
            className="year-select"
          >
            <option value="">-Year-</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button className="show-data-button" onClick={showMonthlyData}>
            Show Attendance Data
          </button>
        </div>
      </div>
      
      {showCumulativeData && (
        <div className="cumulative-data">
          <h3>Attendance Summary: {selectedMonth} {selectedYear}</h3>
          
          <div className="summary-stats">
            <div className="stat-box">
              <div className="stat-label">Total Classes</div>
              <div className="stat-value">{cumulativeData.totalClasses}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Classes Attended</div>
              <div className="stat-value">{cumulativeData.attended}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Attendance Percentage</div>
              <div className="stat-value">{cumulativeData.percentage}%</div>
            </div>
          </div>
          
          <h3>Course-wise Attendance</h3>
          <div className="course-wise-table">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Total Classes</th>
                  <th>Classes Attended</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cumulativeData.courseWiseData.map((course, index) => (
                  <tr key={index}>
                    <td>{course.course}</td>
                    <td>{course.total}</td>
                    <td>{course.attended}</td>
                    <td>{course.percentage}%</td>
                    <td>
                      <span className={`status-badge ${course.percentage >= 75 ? 'good' : 'warning'}`}>
                        {course.percentage >= 75 ? 'Good Standing' : 'Attendance Warning'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="attendance-list">
        <h3>Recent Attendance Records</h3>
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <div className="course-header">
              <span>{course.name}</span>
              <span className="course-date">{course.date}</span>
              <button 
                className="show-button"
                onClick={() => toggleCourseDetails(course.id)}
              >
                {expandedCourseIds[course.id] ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {/* This is the key change - use direct conditional rendering instead of CSS classes */}
            {expandedCourseIds[course.id] && (
              <div className="course-details show">
                <h4>Attendance Records</h4>
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.attendanceData.map((record, index) => (
                      <tr key={index} className={record.status.toLowerCase()}>
                        <td>{record.date}</td>
                        <td>{record.status}</td>
                        <td>{record.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAttendance;