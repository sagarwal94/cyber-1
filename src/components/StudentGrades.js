import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentGrades.css';

const StudentGrades = () => {
  const navigate = useNavigate();
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [newGrade, setNewGrade] = useState({
    studentId: '',
    semesterId: '',
    courseId: '',
    grade: '',
    points: '',
    comments: ''
  });
  
  
  const students = [
    { id: '2420099', name: 'Siva Abishikth' },
    { id: '2420100', name: 'frukan' },
    { id: '2420101', name: 'Dovran' },
    { id: '2420102', name: 'garurav' },
    { id: '2420103', name: 'Sonal' }
  ];
  
  const semesters = [
    { id: 1, name: '1/2 Semester-1' },
    { id: 2, name: '1/2 Semester-2' },
    { id: 3, name: '1/2 Semester-3' },
    { id: 4, name: '1/2 Semester-4' }
  ];
  
  const coursesData = [
    { id: 1, semesterId: 1, name: 'Course 1', code: 'CMPS 514', credits: 3 },
    { id: 2, semesterId: 1, name: 'Course 2', code: 'BGDA 510', credits: 3 },
    { id: 3, semesterId: 1, name: 'Course 3', code: 'CMPS 570', credits: 3 },
    { id: 4, semesterId: 2, name: 'Course 1', code: 'CMPS 620', credits: 3 },
    { id: 5, semesterId: 2, name: 'Course 2', code: 'BGDA 520', credits: 3 },
    { id: 6, semesterId: 2, name: 'Course 3', code: 'CMPS 650', credits: 3 },
    { id: 7, semesterId: 3, name: 'Course 1', code: 'CMPS 712', credits: 3 },
    { id: 8, semesterId: 3, name: 'Course 2', code: 'BGDA 630', credits: 3 },
    { id: 9, semesterId: 3, name: 'Course 3', code: 'CMPS 680', credits: 3 },
    { id: 10, semesterId: 4, name: 'Course 1', code: 'CMPS 720', credits: 3 },
    { id: 11, semesterId: 4, name: 'Course 2', code: 'BGDA 640', credits: 3 },
    { id: 12, semesterId: 4, name: 'Course 3', code: 'CMPS 730', credits: 3 }
  ];
  
  const grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
  const pointValues = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, 
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0
  };
  
  
  const [gradesData, setGradesData] = useState({
    overallCGPA: "3.50",
    creditsCompleted: "36",
    totalCredits: "36",
    semesters: [
      {
        id: 1,
        name: "1/2 Semester-1",
        courses: [
          { id: 1, name: "Course 1", code: "CMPS 514", credits: 3, grade: "", points: 4.0 },
          { id: 2, name: "Course 2", code: "BGDA 510", credits: 3, grade: "", points: 3.7 },
          { id: 3, name: "Course 3", code: "CMPS 570", credits: 3, grade: "", points: 3.3 }
        ],
        sgpa: "",
        cgpa: ""
      },
      {
        id: 2,
        name: "1/2 Semester-2",
        courses: [
          { id: 4, name: "Course 1", code: "CMPS 620", credits: 3, grade: "", points: 3.7 },
          { id: 5, name: "Course 2", code: "BGDA 520", credits: 3, grade: "", points: 3.3 },
          { id: 6, name: "Course 3", code: "CMPS 650", credits: 3, grade: "", points: 4.0 }
        ],
        sgpa: "",
        cgpa: ""
      },
      {
        id: 3,
        name: "1/2 Semester-3",
        courses: [
          { id: 7, name: "Course 1", code: "CMPS 712", credits: 3, grade: "", points: 3.3 },
          { id: 8, name: "Course 2", code: "BGDA 630", credits: 3, grade: "", points: 4.0 },
          { id: 9, name: "Course 3", code: "CMPS 680", credits: 3, grade: "", points: 3.0 }
        ],
        sgpa: "",
        cgpa: ""
      },
      {
        id: 4,
        name: "1/2 Semester-4",
        courses: [
          { id: 10, name: "Course 1", code: "CMPS 720", credits: 3, grade: "", points: 4.0 },
          { id: 11, name: "Course 2", code: "BGDA 640", credits: 3, grade: "", points: 3.0 },
          { id: 12, name: "Course 3", code: "CMPS 730", credits: 3, grade: "", points: 3.7 }
        ],
        sgpa: "",
        cgpa: ""
      }
    ]
  });

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

  const handleAddGradeClick = () => {
    setShowAddGradeModal(true);
  };

  const handleCloseModal = () => {
    setShowAddGradeModal(false);
    setNewGrade({
      studentId: '',
      semesterId: '',
      courseId: '',
      grade: '',
      points: '',
      comments: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    
    if (name === 'grade' && value) {
      setNewGrade({
        ...newGrade,
        [name]: value,
        points: pointValues[value].toString()
      });
    } else {
      setNewGrade({
        ...newGrade,
        [name]: value
      });
    }
  };

  const handleSemesterChange = (e) => {
    const semesterId = e.target.value;
    setNewGrade({
      ...newGrade,
      semesterId,
      courseId: '' 
    });
  };

  const getFilteredCourses = () => {
    if (!newGrade.semesterId) return [];
    return coursesData.filter(course => course.semesterId.toString() === newGrade.semesterId);
  };

  const handleAddGrade = () => {
    
    if (!newGrade.studentId || !newGrade.semesterId || !newGrade.courseId || !newGrade.grade) {
      alert('Please fill in all required fields (Student, Semester, Course, Grade)');
      return;
    }

    
    const semesterIndex = gradesData.semesters.findIndex(
      semester => semester.id.toString() === newGrade.semesterId
    );
    
    if (semesterIndex === -1) {
      alert('Semester not found');
      return;
    }

    const courseIndex = gradesData.semesters[semesterIndex].courses.findIndex(
      course => course.id.toString() === newGrade.courseId
    );

    if (courseIndex === -1) {
      alert('Course not found');
      return;
    }

    
    const updatedGradesData = { ...gradesData };
    updatedGradesData.semesters[semesterIndex].courses[courseIndex].grade = newGrade.grade;
    updatedGradesData.semesters[semesterIndex].courses[courseIndex].points = parseFloat(newGrade.points);
    
    
    const totalCredits = updatedGradesData.semesters[semesterIndex].courses.reduce(
      (sum, course) => sum + course.credits, 0
    );
    
    const totalPoints = updatedGradesData.semesters[semesterIndex].courses.reduce(
      (sum, course) => sum + (course.points * course.credits), 0
    );
    
    const sgpa = (totalPoints / totalCredits).toFixed(2);
    updatedGradesData.semesters[semesterIndex].sgpa = sgpa;
    
    
    const allCourses = updatedGradesData.semesters.flatMap(semester => semester.courses);
    const overallTotalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);
    const overallTotalPoints = allCourses.reduce((sum, course) => sum + (course.points * course.credits), 0);
    const cgpa = (overallTotalPoints / overallTotalCredits).toFixed(2);
    
    updatedGradesData.overallCGPA = cgpa;
    
  
    setGradesData(updatedGradesData);
    
    
    handleCloseModal();
    
  
    alert('Grade added successfully!');
  };

  return (
    <div className="grades-container">
      <div className="grades-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>GRADES</h2>
      </div>

      <div className="add-grade-container">
        <button 
          className="add-grade-button"
          onClick={handleAddGradeClick}
          style={{
            backgroundColor: "#192f5d",
            color: "white"
          }}
        >
          Add Grade
        </button>
      </div>

      <div className="grades-content">
        {gradesData.semesters.map((semester) => (
          <div key={semester.id} className="semester-section">
            <h3 className="semester-title">{semester.name}</h3>
            
            <div className="grades-table-container">
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Course 1</th>
                    <th>Course 2</th>
                    <th>Course 3</th>
                    <th>CGPA</th>
                    <th>SGPA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{semester.courses[0]?.grade || '-'}</td>
                    <td>{semester.courses[1]?.grade || '-'}</td>
                    <td>{semester.courses[2]?.grade || '-'}</td>
                    <td>{semester.cgpa}</td>
                    <td>{semester.sgpa}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="grades-label" colSpan="5">Grades</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}
        
        <div className="overall-cgpa">
          CGPA: [{gradesData.creditsCompleted}/{gradesData.totalCredits}] {gradesData.overallCGPA}
        </div>
      </div>

    
      {showAddGradeModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add Grade</h3>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <form className="grade-form">
                <div className="form-group">
                  <label htmlFor="studentId">Student: <span className="required">*</span></label>
                  <select
                    id="studentId"
                    name="studentId"
                    value={newGrade.studentId}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.id} - {student.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="semesterId">Semester: <span className="required">*</span></label>
                  <select
                    id="semesterId"
                    name="semesterId"
                    value={newGrade.semesterId}
                    onChange={handleSemesterChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(semester => (
                      <option key={semester.id} value={semester.id}>
                        {semester.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="courseId">Course: <span className="required">*</span></label>
                  <select
                    id="courseId"
                    name="courseId"
                    value={newGrade.courseId}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={!newGrade.semesterId}
                  >
                    <option value="">Select Course</option>
                    {getFilteredCourses().map(course => (
                      <option key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="grade">Grade: <span className="required">*</span></label>
                    <select
                      id="grade"
                      name="grade"
                      value={newGrade.grade}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="points">Points:</label>
                    <input
                      type="text"
                      id="points"
                      name="points"
                      value={newGrade.points}
                      onChange={handleInputChange}
                      className="form-input"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="comments">Comments:</label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={newGrade.comments}
                    onChange={handleInputChange}
                    className="form-input textarea"
                    rows="3"
                    placeholder="Optional comments about the grade"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              <button 
                className="add-button" 
                onClick={handleAddGrade}
                style={{
                  backgroundColor: "#192f5d",
                  color: "white"
                }}
              >
                Add Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGrades;