import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLibrary.css';

const StudentLibrary = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchCategory, setSearchCategory] = useState('title'); // Default search by title
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample courses data
  const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
  ];

  // Sample departments data
  const departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Cybersecurity' },
    { id: 4, name: 'Artificial Intelligence' }
  ];

  // Sample library resources
  const libraryResources = [
    { 
      id: 1, 
      title: 'Principles of Cybersecurity', 
      author: 'Jennifer Smith', 
      course: 'Course 1',
      department: 'Cybersecurity',
      type: 'Book',
      year: 2024,
      link: 'https://example.com/resource1'
    },
    { 
      id: 2, 
      title: 'Advanced Machine Learning Algorithms', 
      author: 'Michael Brown', 
      course: 'Course 2',
      department: 'Artificial Intelligence',
      type: 'Book',
      year: 2023,
      link: 'https://example.com/resource2'
    },
    { 
      id: 3, 
      title: 'Network Security Essentials', 
      author: 'David Wilson', 
      course: 'Course 1',
      department: 'Cybersecurity',
      type: 'Research Paper',
      year: 2024,
      link: 'https://example.com/resource3'
    },
    { 
      id: 4, 
      title: 'Introduction to Programming', 
      author: 'Sarah Johnson', 
      course: 'Course 3',
      department: 'Computer Science',
      type: 'Book',
      year: 2022,
      link: 'https://example.com/resource4'
    }
  ];

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleSearch = (type) => {
    let filteredResults = [...libraryResources];
    
    // Filter based on search word if provided
    if (searchWord) {
      if (searchCategory === 'title') {
        filteredResults = filteredResults.filter(resource => 
          resource.title.toLowerCase().includes(searchWord.toLowerCase())
        );
      } else if (searchCategory === 'author') {
        filteredResults = filteredResults.filter(resource => 
          resource.author.toLowerCase().includes(searchWord.toLowerCase())
        );
      } else if (searchCategory === 'course') {
        filteredResults = filteredResults.filter(resource => 
          resource.course.toLowerCase().includes(searchWord.toLowerCase())
        );
      } else if (searchCategory === 'department') {
        filteredResults = filteredResults.filter(resource => 
          resource.department.toLowerCase().includes(searchWord.toLowerCase())
        );
      } else if (searchCategory === 'research') {
        filteredResults = filteredResults.filter(resource => 
          resource.type === 'Research Paper' && 
          resource.title.toLowerCase().includes(searchWord.toLowerCase())
        );
      }
    }
    
    // Additional filtering based on dropdown selections
    if (type === 'course' && selectedCourse) {
      filteredResults = filteredResults.filter(resource => 
        resource.course === selectedCourse
      );
    }
    
    if (type === 'department' && selectedDepartment) {
      filteredResults = filteredResults.filter(resource => 
        resource.department === selectedDepartment
      );
    }
    
    setSearchResults(filteredResults);
    setHasSearched(true);
  };

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
  };

  return (
    <div className="library-container">
      <div className="library-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>E - LIBRARY</h2>
      </div>

      <div className="search-categories">
        <label className="radio-container">
          <input 
            type="radio" 
            name="searchCategory" 
            checked={searchCategory === 'title'} 
            onChange={() => handleCategoryChange('title')}
          />
          <span className="radio-custom"></span>
          Title
        </label>
        <label className="radio-container">
          <input 
            type="radio" 
            name="searchCategory" 
            checked={searchCategory === 'author'} 
            onChange={() => handleCategoryChange('author')}
          />
          <span className="radio-custom"></span>
          Author
        </label>
        <label className="radio-container">
          <input 
            type="radio" 
            name="searchCategory" 
            checked={searchCategory === 'course'} 
            onChange={() => handleCategoryChange('course')}
          />
          <span className="radio-custom"></span>
          Course
        </label>
        <label className="radio-container">
          <input 
            type="radio" 
            name="searchCategory" 
            checked={searchCategory === 'department'} 
            onChange={() => handleCategoryChange('department')}
          />
          <span className="radio-custom"></span>
          Department
        </label>
        <label className="radio-container">
          <input 
            type="radio" 
            name="searchCategory" 
            checked={searchCategory === 'research'} 
            onChange={() => handleCategoryChange('research')}
          />
          <span className="radio-custom"></span>
          Research Papers
        </label>
      </div>

      <div className="search-section">
        <div className="search-row">
          <label className="search-label">Search Word :</label>
          <input 
            type="text" 
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="search-input"
          />
          <button 
            className="search-button"
            onClick={() => handleSearch('word')}
          >
            Search
          </button>
        </div>

        <div className="search-row">
          <label className="search-label">Course :</label>
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="search-select"
          >
            <option value="">-Courses-</option>
            {courses.map(course => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
          <button 
            className="search-button"
            onClick={() => handleSearch('course')}
          >
            Search
          </button>
        </div>

        <div className="search-row">
          <label className="search-label">Department :</label>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="search-select"
          >
            <option value="search-button">-Department-</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
          <button 
            className="search-button"
            onClick={() => handleSearch('department')}
          >
            Search
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="search-results">
          <h3>Search Results ({searchResults.length})</h3>
          {searchResults.length > 0 ? (
            <table className="results-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(resource => (
                  <tr key={resource.id}>
                    <td>{resource.title}</td>
                    <td>{resource.author}</td>
                    <td>{resource.course}</td>
                    <td>{resource.department}</td>
                    <td>{resource.type}</td>
                    <td>{resource.year}</td>
                    <td>
                      <a 
                        href={resource.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-link"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No resources found matching your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentLibrary;