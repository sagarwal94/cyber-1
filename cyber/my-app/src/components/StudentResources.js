import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentResources.css';

const StudentResources = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [resourceType, setResourceType] = useState('E-Book');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample resources data
  const resourcesData = [
    {
      id: 1,
      title: "Introduction to Cybersecurity",
      type: "E-Book",
      author: "John Smith",
      year: 2023,
      link: "https://example.com/cybersecurity-intro",
      description: "A comprehensive introduction to the field of cybersecurity."
    },
    {
      id: 2,
      title: "Wireshark Network Analysis Tool",
      type: "Tools",
      author: "Wireshark Foundation",
      year: 2022,
      link: "https://www.wireshark.org/",
      description: "Open source tool for network protocol analysis."
    },
    {
      id: 3,
      title: "Database Security Best Practices",
      type: "Notes",
      author: "Prof. Sarah Johnson",
      year: 2024,
      link: "https://example.com/db-security-notes",
      description: "Comprehensive notes on securing database systems."
    },
    {
      id: 4,
      title: "Simple Password Manager",
      type: "Projects",
      author: "Student Projects",
      year: 2023,
      link: "https://github.com/example/password-manager",
      description: "A beginner-friendly password manager project."
    },
    {
      id: 5,
      title: "How HTTPS Works",
      type: "youtube Links",
      author: "Tech Explained",
      year: 2022,
      link: "https://www.youtube.com/watch?v=example",
      description: "Visual explanation of HTTPS protocols and security."
    },
    {
      id: 6,
      title: "Modern Encryption Techniques",
      type: "Scholoraly Papers",
      author: "Dr. Michael Chen et al.",
      year: 2024,
      link: "https://example.org/journals/encryption-paper",
      description: "Research paper on advancements in encryption algorithms."
    },
    {
      id: 7,
      title: "Cybersecurity Incident Report Template",
      type: "Forms",
      author: "University IT Department",
      year: 2023,
      link: "https://example.edu/forms/incident-report",
      description: "Standard form for reporting cybersecurity incidents."
    }
  ];

  // Resource type options
  const resourceTypes = [
    "E-Book",
    "Tools",
    "Notes",
    "Projects",
    "youtube Links",
    "Scholoraly Papers",
    "Forms"
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
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleSearch = () => {
    let results = [...resourcesData];
    
    // Filter by keyword if provided
    if (searchKeyword.trim()) {
      results = results.filter(resource => 
        resource.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    
    // Filter by resource type if selected
    if (resourceType) {
      results = results.filter(resource => resource.type === resourceType);
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  // Add function to handle form submission on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="resources-container">
      <div className="resources-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>RESOURCES</h2>
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
    </div>
  );
};

export default StudentResources;