import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentAttendance.css';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expandedCourseIds, setExpandedCourseIds] = useState({}); 
  const [showCumulativeData, setShowCumulativeData] = useState(false);
  const [cumulativeData, setCumulativeData] = useState(null);
  const [showManageAttendanceModal, setShowManageAttendanceModal] = useState(false);
  const [selectedCourseForAttendance, setSelectedCourseForAttendance] = useState('');
  const [selectedDateForAttendance, setSelectedDateForAttendance] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceClassTime, setAttendanceClassTime] = useState('10:00');
  const [attendanceNotes, setAttendanceNotes] = useState('');
  const [studentAttendanceStatus, setStudentAttendanceStatus] = useState({});
  
  const students = [
    { id: '2420099', name: 'Siva', department: 'Computer Science' },
    { id: '2420100', name: 'sonal', department: 'Computer Science' },
    { id: '2420101', name: 'hruthik', department: 'Cybersecurity' },
    { id: '2420102', name: 'meena', department: 'Information Technology' },
    { id: '2420103', name: 'frukan', department: 'Artificial Intelligence' },
    { id: '2420104', name: 'fernand', department: 'Computer Science' },
    
  ];
  
  const courses = [
    { 
      id: 1, 
      name: 'Course 1', 
      code: 'CMPS 514',
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
      code: 'BGDA 510',
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
      code: 'CMPS 570',
      date: '31/01/2025',
      attendanceData: [
        { date: '14/01/2025', status: 'Absent', time: '9:00 AM' },
        { date: '21/01/2025', status: 'Present', time: '9:00 AM' },
        { date: '28/01/2025', status: 'Present', time: '9:00 AM' }
      ]
    }
  ];
  
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
      setCumulativeData({
        totalClasses: 0,
        attended: 0,
        percentage: 0,
        courseWiseData: []
      });
      setShowCumulativeData(true);
    }
  };
  
  const handleManageAttendanceClick = () => {
    
    const initialStatus = {};
    students.forEach(student => {
      initialStatus[student.id] = 'Present';
    });
    setStudentAttendanceStatus(initialStatus);
    setShowManageAttendanceModal(true);
  };
  
  const handleCloseModal = () => {
    setShowManageAttendanceModal(false);
    setSelectedCourseForAttendance('');
    setSelectedDateForAttendance(new Date().toISOString().split('T')[0]);
    setAttendanceClassTime('10:00');
    setAttendanceNotes('');
    setStudentAttendanceStatus({});
  };
  
  const handleStudentStatusChange = (studentId, status) => {
    setStudentAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };
  
  const handleMarkAllStatus = (status) => {
    const updatedStatus = {};
    students.forEach(student => {
      updatedStatus[student.id] = status;
    });
    setStudentAttendanceStatus(updatedStatus);
  };
  
  const handleSaveAttendance = () => {
  
    if (!selectedCourseForAttendance) {
      alert('Please select a course');
      return;
    }
    
    
    const dateObj = new Date(selectedDateForAttendance);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
    
    
    const timeArr = attendanceClassTime.split(':');
    const hours = parseInt(timeArr[0]);
    const minutes = timeArr[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
    
  
    const totalStudents = students.length;
    const presentCount = Object.values(studentAttendanceStatus).filter(status => status === 'Present').length;
    const absentCount = Object.values(studentAttendanceStatus).filter(status => status === 'Absent').length;
    const lateCount = Object.values(studentAttendanceStatus).filter(status => status === 'Late').length;
    
    
    console.log('Saving attendance for course:', selectedCourseForAttendance);
    console.log('Date:', formattedDate);
    console.log('Time:', formattedTime);
    console.log('Attendance:', studentAttendanceStatus);
    console.log('Stats:', { totalStudents, presentCount, absentCount, lateCount });
    console.log('Notes:', attendanceNotes);
    
    
    handleCloseModal();
    
    
    alert('Attendance saved successfully!');
  };

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
      
      <div className="add-attendance-container">
        <button 
          className="add-attendance-button"
          onClick={handleManageAttendanceClick}
          style={{
            backgroundColor: "#192f5d",
            color: "white"
          }}
        >
          Manage Attendance
        </button>
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
          <button 
            className="show-data-button" 
            onClick={showMonthlyData}
            style={{
              backgroundColor: "#192f5d",
              color: "white"
            }}
          >
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
              <span>{course.name} ({course.code})</span>
              <span className="course-date">{course.date}</span>
              <button 
                className="show-button"
                onClick={() => toggleCourseDetails(course.id)}
                style={{
                  backgroundColor: "#192f5d",
                  color: "white"
                }}
              >
                {expandedCourseIds[course.id] ? 'Hide' : 'Show'}
              </button>
            </div>
            
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

      
      {showManageAttendanceModal && (
        <div className="modal-overlay">
          <div className="modal-container attendance-modal">
            <div className="modal-header">
              <h3>Manage Class Attendance</h3>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <form className="attendance-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="courseId">Course: <span className="required">*</span></label>
                    <select
                      id="courseId"
                      value={selectedCourseForAttendance}
                      onChange={(e) => setSelectedCourseForAttendance(e.target.value)}
                      className="form-input"
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.name} ({course.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="date">Class Date: <span className="required">*</span></label>
                    <input 
                      type="date" 
                      id="date" 
                      value={selectedDateForAttendance}
                      onChange={(e) => setSelectedDateForAttendance(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="time">Class Time:</label>
                    <input 
                      type="time" 
                      id="time" 
                      value={attendanceClassTime}
                      onChange={(e) => setAttendanceClassTime(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="notes">Session Notes:</label>
                    <input 
                      type="text" 
                      id="notes" 
                      value={attendanceNotes}
                      onChange={(e) => setAttendanceNotes(e.target.value)}
                      className="form-input"
                      placeholder="Optional class session notes"
                    />
                  </div>
                </div>
                
                <div className="quick-actions">
                  <button type="button" className="action-button present" onClick={() => handleMarkAllStatus('Present')}>
                    Mark All Present
                  </button>
                  <button type="button" className="action-button absent" onClick={() => handleMarkAllStatus('Absent')}>
                    Mark All Absent
                  </button>
                </div>
                
                <div className="student-list-container">
                  <h4>Student Attendance</h4>
                  <div className="student-list">
                    <table className="students-table">
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => (
                          <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.department}</td>
                            <td>
                              <select
                                value={studentAttendanceStatus[student.id] || 'Present'}
                                onChange={(e) => handleStudentStatusChange(student.id, e.target.value)}
                                className={`status-select ${studentAttendanceStatus[student.id]?.toLowerCase() || 'present'}`}
                              >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Late">Late</option>
                                <option value="Excused">Excused</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button" 
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className="save-button" 
                onClick={handleSaveAttendance}
                style={{
                  backgroundColor: "#192f5d",
                  color: "white"
                }}
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;