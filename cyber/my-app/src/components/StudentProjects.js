import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './StudentProjects.css';

const StudentProjects = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedCourses, setExpandedCourses] = useState({});
  
  // Sample courses data
  const coursesData = [
    {
      id: 1,
      name: 'Course 1',
      sections: [
        { id: 1, name: 'members', link: '/student-dashboard/projects/1/members' },
        { id: 2, name: 'topic', link: '/student-dashboard/projects/1/topic' },
        { id: 3, name: 'proposal', link: '/student-dashboard/projects/1/proposal' },
        { id: 4, name: 'Resources', link: '/student-dashboard/projects/1/resources' },
        { id: 5, name: 'discussion', link: '/student-dashboard/projects/1/discussion' }
      ]
    },
    {
      id: 2,
      name: 'Course 2',
      sections: [
        { id: 1, name: 'members', link: '/student-dashboard/projects/2/members' },
        { id: 2, name: 'topic', link: '/student-dashboard/projects/2/topic' },
        { id: 3, name: 'proposal', link: '/student-dashboard/projects/2/proposal' },
        { id: 4, name: 'Resources', link: '/student-dashboard/projects/2/resources' },
        { id: 5, name: 'discussion', link: '/student-dashboard/projects/2/discussion' }
      ]
    },
    {
      id: 3,
      name: 'Course 3',
      sections: [
        { id: 1, name: 'members', link: '/student-dashboard/projects/3/members' },
        { id: 2, name: 'topic', link: '/student-dashboard/projects/3/topic' },
        { id: 3, name: 'proposal', link: '/student-dashboard/projects/3/proposal' },
        { id: 4, name: 'Resources', link: '/student-dashboard/projects/3/resources' },
        { id: 5, name: 'discussion', link: '/student-dashboard/projects/3/discussion' }
      ]
    }
  ];

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
    
    // Initialize with Course 1 expanded
    setExpandedCourses({ 1: true });
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const toggleCourse = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // You can implement search functionality here
    console.log('Searching for:', searchKeyword);
  };

  // Filter courses based on search keyword
  const filteredCourses = searchKeyword.trim() 
    ? coursesData.filter(course => 
        course.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        course.sections.some(section => 
          section.name.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    : coursesData;

  return (
    <div className="projects-container">
      <div className="projects-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>PROJECTS</h2>
      </div>

      <div className="projects-content">
        <div className="course-list">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-item">
              <div 
                className="course-header"
                onClick={() => toggleCourse(course.id)}
              >
                <h3>{course.name}</h3>
                <span className="toggle-icon">
                  {expandedCourses[course.id] ? '▼' : '▶'}
                </span>
              </div>
              
              {expandedCourses[course.id] && (
                <div className="course-sections">
                  {course.sections.map((section, index) => (
                    <div key={section.id} className="section-item">
                      <Link to={section.link} className="section-link">
                        {index + 1}.{section.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="search-section">
        <div className="search-label">Search Keyword :</div>
        <div className="search-input-container">
          <input 
            type="text" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search projects..."
            className="search-input"
          />
          <button 
            onClick={handleSearch} 
            className="search-button"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProjects;