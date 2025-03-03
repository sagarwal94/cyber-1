import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentCourses.css';

const StudentCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntake, setSelectedIntake] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [showIntakeDropdown, setShowIntakeDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Sample courses data
  const courses = [
    { id: 1, name: 'Course 1', color: '#8C9EFF', code: 'CS101', instructor: 'Dr. Tsige Tessema', credit: 3 },
    { id: 2, name: 'Course 2', color: '#26A69A', code: 'CS202', instructor: 'Dr. Pipop Nuangpookka', credit: 3 },
    { id: 3, name: 'Course 3', color: '#B0BEC5', code: 'CS303', instructor: 'Dr. Micheline Al Harrack', credit: 3 }
  ];

  // Available intake options
  const intakeOptions = ['FALL', 'SPRING'];
  
  // Available year options
  const yearOptions = ['2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021'];

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const toggleIntakeDropdown = () => {
    setShowIntakeDropdown(!showIntakeDropdown);
    if (showYearDropdown) setShowYearDropdown(false);
  };

  const toggleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
    if (showIntakeDropdown) setShowIntakeDropdown(false);
  };

  const selectIntake = (intake) => {
    setSelectedIntake(intake);
    setShowIntakeDropdown(false);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  // Filter courses based on search term if provided
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-container">
      <div className="courses-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>MY COURSES</h2>
      </div>

      <div className="courses-filters">
        <div className="filter-group">
          <div className="dropdown-container">
            <button 
              className="dropdown-button"
              onClick={toggleIntakeDropdown}
            >
              Intake {selectedIntake ? `: ${selectedIntake}` : ''}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showIntakeDropdown && (
              <div className="dropdown-menu">
                {intakeOptions.map((intake, index) => (
                  <div 
                    key={index} 
                    className="dropdown-item"
                    onClick={() => selectIntake(intake)}
                  >
                    {intake}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button 
              className="dropdown-button"
              onClick={toggleYearDropdown}
            >
              Year {selectedYear ? `: ${selectedYear}` : ''}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showYearDropdown && (
              <div className="dropdown-menu">
                {yearOptions.map((year, index) => (
                  <div 
                    key={index} 
                    className="dropdown-item"
                    onClick={() => selectYear(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="search-container">
          <form onSubmit={handleSearch}>
            <label>Search Courses : </label>
            <div className="search-input-container">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by course name or code"
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="courses-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-color-block" style={{ backgroundColor: course.color }}></div>
              <div className="course-info">
                <h3>{course.name}</h3>
                <div className="course-details">
                  <div className="detail-item">
                    <span className="detail-label">Course Code:</span>
                    <span className="detail-value">{course.code}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Instructor:</span>
                    <span className="detail-value">{course.instructor}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Credits:</span>
                    <span className="detail-value">{course.credit}</span>
                  </div>
                </div>
                <div className="course-actions">
                  <button className="action-button" onClick={() => navigate(`/student-dashboard/course/${course.id}`)}>
                    View Details
                  </button>
                  <button className="action-button secondary" onClick={() => navigate(`/student-dashboard/attendance/${course.id}`)}>
                    View Attendance
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-courses">
            <p>No courses found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;