import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseAttendanceDetail.css';

const CourseAttendanceDetail = () => {
  const { courseId, date } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    { id: '1001', name: 'Siva', status: 'present' },
    { id: '1002', name: 'Sonal', status: 'absent' },
    { id: '1003', name: 'Gaurav', status: 'present' },
    
  ]);

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
  };

  const handleSave = () => {
    
    console.log('Saving attendance:', students);
    alert('Attendance saved successfully!');
    navigate('/student-dashboard/attendance');
  };

  return (
    <div className="attendance-detail-container">
      <div className="attendance-detail-header">
        <h2>Course {courseId} Attendance</h2>
        <p className="attendance-date">Date: {date}</p>
      </div>

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <div className="status-buttons">
                    <button
                      className={`status-button present ${student.status === 'present' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(student.id, 'present')}
                    >
                      Present
                    </button>
                    <button
                      className={`status-button absent ${student.status === 'absent' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(student.id, 'absent')}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="save-button" onClick={handleSave}>
          Save Attendance
        </button>
        <button 
          className="cancel-button" 
          onClick={() => navigate('/student-dashboard/attendance')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default CourseAttendanceDetail;