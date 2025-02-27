import React, { useState } from 'react';
import './StudentAttendance.css';

const StudentAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  
  const courses = [
    { id: 1, name: 'Course 1', date: '27/01/2025' },
    { id: 2, name: 'Course 2', date: '28/01/2025' },
    { id: 3, name: 'Course 3', date: '31/01/2025' }
  ];

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const years = [2020, 2021, 2022, 2023, 2024, 2025]; 

  const toggleCourseDetails = (courseId) => {
    
    console.log(`Toggle details for course ${courseId}`);
  };

  return (
    <div className="attendance-container">
      <h2>STUDENT ATTENDANCE</h2>
      
      <div className="attendance-filters">
        <div className="filter-group">
          <label>Month/Year:</label>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-select"
          >
            <option value="">-Month-</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>

          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="year-select"
          >
            <option value="">-Year-</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="attendance-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <div className="course-header">
              <span>{course.name}</span>
              <span className="course-date">{course.date}</span>
              <button 
                className="show-button"
                onClick={() => toggleCourseDetails(course.id)}
              >
                Show
              </button>
            </div>
            {/* Course details section - hidden by default */}
            <div className="course-details">
              {/* Add attendance details here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAttendance;