import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import StudentAttendance from './components/StudentAttendance';
import CourseAttendanceDetail from './components/CourseAttendanceDetail';
import StudentCourses from './components/StudentCourses';
import StudentLibrary from './components/StudentLibrary';
import StudentDiscussions from './components/StudentDiscussions';
import DiscussionDetail from './components/DiscussionDetail';
import StudentResources from './components/StudentResources';
import StudentProjects from './components/StudentProjects';
import ProjectSection from './components/ProjectSection';
import StudentProfile from './components/StudentProfile';
import StudentSchedule from './components/StudentSchedule';
import StudentGrades from './components/StudentGrades';
import StudentAssignments from './components/StudentAssignments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard/attendance" element={<StudentAttendance />} />
        <Route path="/student-dashboard/attendance/:courseId/:date" element={<CourseAttendanceDetail />} />
        <Route path="/student-dashboard/courses" element={<StudentCourses />} />
        <Route path="/student-dashboard/library" element={<StudentLibrary />} />
        <Route path="/student-dashboard/discussions" element={<StudentDiscussions />} />
        <Route path="/student-dashboard/discussion/:topicId" element={<DiscussionDetail />} />
        <Route path="/student-dashboard/resources" element={<StudentResources />} />
        <Route path="/student-dashboard/projects" element={<StudentProjects />} />
        <Route path="/student-dashboard/projects/:courseId/:sectionType" element={<ProjectSection />} />
        <Route path="/student-dashboard/profile" element={<StudentProfile />} />
        <Route path="/student-dashboard/schedule" element={<StudentSchedule />} />
        <Route path="/student-dashboard/grades" element={<StudentGrades />} />
        <Route path="/student-dashboard/assignments" element={<StudentAssignments />} />
      </Routes>
    </Router>
  );
}

export default App;