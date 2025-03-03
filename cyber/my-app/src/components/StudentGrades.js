import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentGrades.css';

const StudentGrades = () => {
  const navigate = useNavigate();
  
  // Sample grades data
  const gradesData = {
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
  };

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

  return (
    <div className="grades-container">
      <div className="grades-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>GRADES</h2>
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
    </div>
  );
};

export default StudentGrades;