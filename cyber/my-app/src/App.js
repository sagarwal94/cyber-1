import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import StudentAttendance from './components/StudentAttendance';
import CourseAttendanceDetail from './components/CourseAttendanceDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-dashboard/attendance" element={<StudentAttendance />} />
        <Route path="/student-dashboard/attendance/:courseId/:date" element={<CourseAttendanceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;