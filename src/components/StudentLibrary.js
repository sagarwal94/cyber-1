import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLibrary.css';

const StudentLibrary = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchCategory, setSearchCategory] = useState('title'); 
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    bookId: '',
    author: '',
    source: '',
    course: '',
    department: '',
    type: 'Book',
    year: new Date().getFullYear()
  });

  const bookCategories = [
    { id: 1, name: 'Textbooks' },
    { id: 2, name: 'Reference Books' },
    { id: 3, name: 'Technical Manuals' },
    { id: 4, name: 'Programming Guides' }
  ];
  
  const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
  ];

  const departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Cybersecurity' },
    { id: 4, name: 'Artificial Intelligence' }
  ];

  const [libraryResources, setLibraryResources] = useState([
    { 
      id: 1, 
      title: 'Principles of Cybersecurity', 
      author: 'Jennifer Smith', 
      course: 'Course 1',
      department: 'Cybersecurity',
      type: 'Book',
      bookCategory: 'Textbooks',
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
      bookCategory: 'Reference Books',
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
      bookCategory: 'Programming Guides',
      year: 2022,
      link: 'https://example.com/resource4'
    }
  ]);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleSearch = (type) => {
    let filteredResults = [...libraryResources];
    
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
      } else if (searchCategory === 'book') {
        filteredResults = filteredResults.filter(resource => 
          resource.type === 'Book' && 
          resource.title.toLowerCase().includes(searchWord.toLowerCase())
        );
      } else if (searchCategory === 'research') {
        filteredResults = filteredResults.filter(resource => 
          resource.type === 'Research Paper' && 
          resource.title.toLowerCase().includes(searchWord.toLowerCase())
        );
      }
    }
    
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

  const handleAddBookClick = () => {
    setShowAddBookModal(true);
  };

  const handleCloseModal = () => {
    setShowAddBookModal(false);
    setNewBook({
      title: '',
      bookId: '',
      author: '',
      source: '',
      course: '',
      department: '',
      type: 'Book',
      year: new Date().getFullYear()
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };

  const handleAddBook = () => {
    // Validate required fields
    if (!newBook.title || !newBook.author || !newBook.bookId) {
      alert('Please fill in all required fields (Title, Author, Book ID)');
      return;
    }

    // Create a new book with the form data
    const bookToAdd = {
      ...newBook,
      id: libraryResources.length + 1,
      link: newBook.source || `https://example.com/book/${newBook.bookId}`,
      year: parseInt(newBook.year) || new Date().getFullYear()
    };
    
    // Add the book to the resources list
    setLibraryResources([...libraryResources, bookToAdd]);
    
    // Add the book to search results if we have already searched
    if (hasSearched) {
      setSearchResults([...searchResults, bookToAdd]);
    }
    
    // Close the modal
    handleCloseModal();

    // Show confirmation
    alert('Book added successfully!');
  };

  return (
    <React.Fragment>
      <div className="library-container">
        <div className="library-header">
          <button className="back-button" onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
          <h2>E - LIBRARY</h2>
        </div>

        <div className="add-book-container">
          <button 
            className="add-book-button"
            onClick={handleAddBookClick}
          >
            Add New Book
          </button>
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
              checked={searchCategory === 'book'} 
              onChange={() => handleCategoryChange('book')}
            />
            <span className="radio-custom"></span>
            <span className="category-icon book-icon">📚</span>
            Books
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
              <option value="">-Department-</option>
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

        {/* Add Book Modal */}
        {showAddBookModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Add New Book</h3>
                <button className="close-button" onClick={handleCloseModal}>×</button>
              </div>
              <div className="modal-body">
                <form className="book-form">
                  <div className="form-group">
                    <label htmlFor="title">Book Title: <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="title" 
                      name="title" 
                      value={newBook.title}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bookId">Book ID: <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="bookId" 
                      name="bookId"
                      value={newBook.bookId}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="author">Author: <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="author" 
                      name="author"
                      value={newBook.author}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="source">Source URL:</label>
                    <input 
                      type="text" 
                      id="source" 
                      name="source"
                      value={newBook.source}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://example.com/book"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="course">Course:</label>
                    <select
                      id="course"
                      name="course"
                      value={newBook.course}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <select
                      id="department"
                      name="department"
                      value={newBook.department}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="year">Publication Year:</label>
                    <input 
                      type="number" 
                      id="year" 
                      name="year"
                      value={newBook.year}
                      onChange={handleInputChange}
                      className="form-input"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
                <button 
                  className="add-button" 
                  onClick={handleAddBook}
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default StudentLibrary;