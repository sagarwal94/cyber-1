import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentResources.css';

const StudentResources = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [resourceType, setResourceType] = useState('E-Book');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'E-Book',
    author: '',
    year: new Date().getFullYear(),
    description: '',
    link: '',
    department: '',
    tags: ''
  });

  const resourceTypes = [
    "E-Book",
    "Tools",
    "Notes",
    "Projects",
    "YouTube Links",
    "Scholarly Papers",
    "Forms"
  ];

  const departments = [
    "Computer Science",
    "Information Technology",
    "Cybersecurity",
    "Artificial Intelligence"
  ];

  const [resourcesData, setResourcesData] = useState([
    {
      id: 1,
      title: "Introduction to Cybersecurity",
      type: "E-Book",
      author: "John Smith",
      year: 2023,
      link: "https://example.com/cybersecurity-intro",
      description: "A comprehensive introduction to the field of cybersecurity.",
      department: "Cybersecurity",
      tags: "security,introduction,basics"
    },
    {
      id: 2,
      title: "Wireshark Network Analysis Tool",
      type: "Tools",
      author: "Wireshark Foundation",
      year: 2022,
      link: "https://www.wireshark.org/",
      description: "Open source tool for network protocol analysis.",
      department: "Cybersecurity",
      tags: "network,analysis,packet sniffing"
    },
    {
      id: 3,
      title: "Database Security Best Practices",
      type: "Notes",
      author: "Prof. Sarah Johnson",
      year: 2024,
      link: "https://example.com/db-security-notes",
      description: "Comprehensive notes on securing database systems.",
      department: "Information Technology",
      tags: "database,security,SQL"
    },
    {
      id: 4,
      title: "Simple Password Manager",
      type: "Projects",
      author: "Student Projects",
      year: 2023,
      link: "https://github.com/example/password-manager",
      description: "A beginner-friendly password manager project.",
      department: "Computer Science",
      tags: "password,security,project"
    },
    {
      id: 5,
      title: "How HTTPS Works",
      type: "YouTube Links",
      author: "Tech Explained",
      year: 2022,
      link: "https://www.youtube.com/watch?v=example",
      description: "Visual explanation of HTTPS protocols and security.",
      department: "Information Technology",
      tags: "https,protocols,security"
    },
    {
      id: 6,
      title: "Modern Encryption Techniques",
      type: "Scholarly Papers",
      author: "Dr. Michael Chen et al.",
      year: 2024,
      link: "https://example.org/journals/encryption-paper",
      description: "Research paper on advancements in encryption algorithms.",
      department: "Cybersecurity",
      tags: "encryption,algorithms,research"
    },
    {
      id: 7,
      title: "Cybersecurity Incident Report Template",
      type: "Forms",
      author: "University IT Department",
      year: 2023,
      link: "https://example.edu/forms/incident-report",
      description: "Standard form for reporting cybersecurity incidents.",
      department: "Cybersecurity",
      tags: "incident,report,template"
    }
  ]);

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

  const handleSearch = () => {
    let results = [...resourcesData];
    
    if (searchKeyword.trim()) {
      results = results.filter(resource => 
        resource.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (resource.tags && resource.tags.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }
    
    if (resourceType) {
      results = results.filter(resource => resource.type === resourceType);
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddResourceClick = () => {
    setShowAddResourceModal(true);
  };

  const handleCloseModal = () => {
    setShowAddResourceModal(false);
    setNewResource({
      title: '',
      type: 'E-Book',
      author: '',
      year: new Date().getFullYear(),
      description: '',
      link: '',
      department: '',
      tags: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({
      ...newResource,
      [name]: value
    });
  };

  const handleAddResource = () => {
    
    if (!newResource.title || !newResource.author) {
      alert('Please fill in all required fields (Title, Author)');
      return;
    }

    
    const resourceToAdd = {
      ...newResource,
      id: resourcesData.length + 1,
      year: parseInt(newResource.year) || new Date().getFullYear()
    };
    
    
    const updatedResources = [...resourcesData, resourceToAdd];
    setResourcesData(updatedResources);
    
   
    if (hasSearched) {
      if (resourceToAdd.type === resourceType || resourceType === '') {
        setSearchResults([...searchResults, resourceToAdd]);
      }
    }
    
    
    handleCloseModal();

    
    alert('Resource added successfully!');
  };

  return (
    <div className="resources-container">
      <div className="resources-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>RESOURCES</h2>
      </div>

      <div className="add-resource-container">
        <button 
          className="add-resource-button"
          onClick={handleAddResourceClick}
        >
          Add New Resource
        </button>
      </div>

      <div className="search-form">
        <div className="search-row">
          <label>Search Keyword :</label>
          <input 
            type="text" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
            placeholder="Enter keyword to search"
          />
        </div>
        
        <div className="search-row">
          <label>Resource Type :</label>
          <select 
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="search-select"
          >
            {resourceTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="search-button-container">
          <button 
            onClick={handleSearch} 
            className="search-button"
            type="button"
            style={{
              backgroundColor: "#192f5d",
              color: "white",
              border: "none",
              padding: "0.8rem 2.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              textTransform: "uppercase",
              width: "200px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px"
            }}
          >
            Search
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="search-results">
          <h3>Search Results ({searchResults.length})</h3>
          
          {searchResults.length > 0 ? (
            <div className="results-grid">
              {searchResults.map(resource => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-type">{resource.type}</div>
                  <h4 className="resource-title">{resource.title}</h4>
                  <div className="resource-meta">
                    <span>By: {resource.author}</span>
                    <span>Year: {resource.year}</span>
                  </div>
                  <p className="resource-description">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    Access Resource
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No resources found matching your search criteria.</p>
            </div>
          )}
        </div>
      )}

      
      {showAddResourceModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add New Resource</h3>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <form className="resource-form">
                <div className="form-group">
                  <label htmlFor="title">Title: <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={newResource.title}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="type">Resource Type: <span className="required">*</span></label>
                  <select
                    id="type"
                    name="type"
                    value={newResource.type}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    {resourceTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="author">Author/Creator: <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="author" 
                    name="author"
                    value={newResource.author}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="year">Year:</label>
                  <input 
                    type="number" 
                    id="year" 
                    name="year"
                    value={newResource.year}
                    onChange={handleInputChange}
                    className="form-input"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description: <span className="required">*</span></label>
                  <textarea 
                    id="description" 
                    name="description"
                    value={newResource.description}
                    onChange={handleInputChange}
                    className="form-input textarea"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="link">Resource Link: <span className="required">*</span></label>
                  <input 
                    type="url" 
                    id="link" 
                    name="link"
                    value={newResource.link}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com/resource"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department:</label>
                  <select
                    id="department"
                    name="department"
                    value={newResource.department}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Tags (comma separated):</label>
                  <input 
                    type="text" 
                    id="tags" 
                    name="tags"
                    value={newResource.tags}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="security, network, programming"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              <button 
                className="add-button" 
                onClick={handleAddResource}
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResources;