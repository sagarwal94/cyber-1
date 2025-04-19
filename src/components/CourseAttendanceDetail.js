import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseAttendanceDetail.css';

const CourseAttendanceDetail = () => {
  const { courseId, date } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState(null);
  
  
  const coursesData = {
    1: { name: 'Course 1', instructor: 'Dr. John Smith', code: 'CS101' },
    2: { name: 'Course 2', instructor: 'Dr. Jane Doe', code: 'CS202' },
    3: { name: 'Course 3', instructor: 'Prof. Robert Johnson', code: 'CS303' }
  };
  
  // Simulated attendance data
  const mockAttendanceData = {
    students: [
      { id: '2420099', name: 'Siva', status: 'Present', timeIn: '09:58 AM', timeOut: '11:30 AM' },
      { id: '2420100', name: 'Alex', status: 'Present', timeIn: '09:52 AM', timeOut: '11:28 AM' },
      { id: '2420101', name: 'Maria', status: 'Absent', timeIn: '-', timeOut: '-' },
      { id: '2420102', name: 'John', status: 'Present', timeIn: '10:05 AM', timeOut: '11:30 AM' },
      { id: '2420103', name: 'Sarah', status: 'Late', timeIn: '10:25 AM', timeOut: '11:30 AM' }
    ],
    courseInfo: {
      date: date,
      totalStudents: 5,
      presentCount: 3,
      absentCount: 1,
      lateCount: 1,
      duration: '10:00 AM - 11:30 AM',
      room: 'B-201'
    },
    studentDetails: {
      '2420099': { 
        totalAttendance: 92,
        courseAttendance: [
          { date: '10/01/2025', status: 'Present' },
          { date: '17/01/2025', status: 'Present' },
          { date: '24/01/2025', status: 'Present' }
        ]
      }
    }
  };
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setAttendanceData(mockAttendanceData);
      setLoading(false);
    }, 800);
  }, [courseId, date]);
  
  const handleBackToAttendance = () => {
    navigate('/student-dashboard/attendance');
  };
  
  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };
  
  if (loading) {
    return (
      <div className="attendance-detail-container">
        <div className="loading">Loading attendance data...</div>
      </div>
    );
  }
  
  return (
    <div className="attendance-detail-container">
      <div className="navigation-buttons">
        <button className="back-button" onClick={handleBackToDashboard}>← Back to Dashboard</button>
        <button className="back-button secondary" onClick={handleBackToAttendance}>← Back to Attendance</button>
      </div>
      
      <div className="course-header-detail">
        <h2>{coursesData[courseId]?.name || 'Course'} Attendance Details</h2>
        <div className="course-info">
          <div className="info-item">
            <span className="info-label">Date:</span>
            <span className="info-value">{date}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Course Code:</span>
            <span className="info-value">{coursesData[courseId]?.code || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Instructor:</span>
            <span className="info-value">{coursesData[courseId]?.instructor || 'Not assigned'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Time:</span>
            <span className="info-value">{attendanceData.courseInfo.duration}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Room:</span>
            <span className="info-value">{attendanceData.courseInfo.room}</span>
          </div>
        </div>
      </div>
      
      <div className="attendance-summary">
        <div className="summary-box">
          <h3>Total</h3>
          <span className="count">{attendanceData.courseInfo.totalStudents}</span>
        </div>
        <div className="summary-box present">
          <h3>Present</h3>
          <span className="count">{attendanceData.courseInfo.presentCount}</span>
        </div>
        <div className="summary-box absent">
          <h3>Absent</h3>
          <span className="count">{attendanceData.courseInfo.absentCount}</span>
        </div>
        <div className="summary-box late">
          <h3>Late</h3>
          <span className="count">{attendanceData.courseInfo.lateCount}</span>
        </div>
      </div>
      
      <div className="attendance-detail-section">
        <h3>Student Attendance List</h3>
        <div className="attendance-detail-table">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.students.map((student) => (
                <tr key={student.id} className={student.status.toLowerCase()}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>{student.timeIn}</td>
                  <td>{student.timeOut}</td>
                  <td>
                    <button className="action-button" onClick={() => alert(`View details for ${student.name}`)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="your-attendance-section">
        <h3>Your Attendance in this Course</h3>
        <div className="your-attendance-stats">
          <div className="stat-item">
            <span className="stat-label">Your Overall Attendance:</span>
            <span className="stat-value">92%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Classes Attended:</span>
            <span className="stat-value">11/12</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Status:</span>
            <span className="stat-value status-good">Good Standing</span>
          </div>
        </div>
        
        <h4>Recent Attendance History</h4>
        <div className="history-timeline">
          {attendanceData.studentDetails['2420099'].courseAttendance.map((record, index) => (
            <div key={index} className={`timeline-item ${record.status.toLowerCase()}`}>
              <div className="timeline-date">{record.date}</div>
              <div className="timeline-status">{record.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAttendanceDetail;