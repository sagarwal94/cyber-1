import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './StudentProjects.css';

const StudentProjects = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedCourses, setExpandedCourses] = useState({});
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    courseId: '',
    topic: '',
    proposal: '',
    proposalStatus: 'Pending',
    members: [{ id: '', name: '', email: '', role: '' }],
    resources: [{ name: '', link: '', type: 'Document' }]
  });
  
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

  const [availableStudents, setAvailableStudents] = useState([
    { id: '2420099', name: 'Siva Abishikth', email: 'sivaabishikth2025@gmail.com' },
    { id: '2420104', name: 'Frukan Ahmed', email: 'frukan@example.com' },
    { id: '2420105', name: 'Sonal Agarwal', email: 'Casonalmodi94@gmail.com' },
    { id: '2420106', name: 'Guarav Pandey', email: 'guarav@example.com' }
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
    console.log('Searching for:', searchKeyword);
  };

  const filteredCourses = searchKeyword.trim() 
    ? coursesData.filter(course => 
        course.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        course.sections.some(section => 
          section.name.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    : coursesData;

  const handleAddProjectClick = () => {
    setShowAddProjectModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProjectModal(false);
    setNewProject({
      courseId: '',
      topic: '',
      proposal: '',
      proposalStatus: 'Pending',
      members: [{ id: '', name: '', email: '', role: '' }],
      resources: [{ name: '', link: '', type: 'Document' }]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...newProject.members];
    
    if (field === 'id') {
      
      const selectedStudent = availableStudents.find(student => student.id === value);
      if (selectedStudent) {
        updatedMembers[index] = {
          ...updatedMembers[index],
          id: value,
          name: selectedStudent.name,
          email: selectedStudent.email
        };
      } else {
        updatedMembers[index] = {
          ...updatedMembers[index],
          id: value
        };
      }
    } else {
      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value
      };
    }

    setNewProject({
      ...newProject,
      members: updatedMembers
    });
  };

  const addMember = () => {
    setNewProject({
      ...newProject,
      members: [...newProject.members, { id: '', name: '', email: '', role: '' }]
    });
  };

  const removeMember = (index) => {
    const updatedMembers = [...newProject.members];
    updatedMembers.splice(index, 1);
    setNewProject({
      ...newProject,
      members: updatedMembers
    });
  };

  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...newProject.resources];
    updatedResources[index] = {
      ...updatedResources[index],
      [field]: value
    };

    setNewProject({
      ...newProject,
      resources: updatedResources
    });
  };

  const addResource = () => {
    setNewProject({
      ...newProject,
      resources: [...newProject.resources, { name: '', link: '', type: 'Document' }]
    });
  };

  const removeResource = (index) => {
    const updatedResources = [...newProject.resources];
    updatedResources.splice(index, 1);
    setNewProject({
      ...newProject,
      resources: updatedResources
    });
  };

  const handleAddProject = () => {
    
    if (!newProject.courseId || !newProject.topic || !newProject.proposal) {
      alert('Please fill in all required fields (Course, Topic, Proposal)');
      return;
    }

    
    if (newProject.members.some(member => !member.id || !member.role)) {
      alert('Please complete all member details');
      return;
    }

   
    if (newProject.resources.some(resource => !resource.name || !resource.link)) {
      alert('Please complete all resource details');
      return;
    }

    
    console.log('Adding new project:', newProject);

    
    handleCloseModal();
    alert('Project added successfully!');
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>PROJECTS</h2>
      </div>

      <div className="add-project-container">
        <button 
          className="add-project-button"
          onClick={handleAddProjectClick}
          style={{
            backgroundColor: "#192f5d",
            color: "white"
          }}
        >
          Add New Project
        </button>
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
            style={{
              backgroundColor: "#192f5d",
              color: "white"
            }}
          >
            🔍
          </button>
        </div>
      </div>

      
      {showAddProjectModal && (
        <div className="modal-overlay">
          <div className="modal-container project-modal">
            <div className="modal-header">
              <h3>Add New Project</h3>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <form className="project-form">
                {/* Course Selection */}
                <div className="form-group">
                  <label htmlFor="courseId">Course: <span className="required">*</span></label>
                  <select
                    id="courseId"
                    name="courseId"
                    value={newProject.courseId}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Course</option>
                    {coursesData.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>

                {/* Project Topic */}
                <div className="form-group">
                  <label htmlFor="topic">Project Topic: <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="topic" 
                    name="topic"
                    value={newProject.topic}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter project topic"
                    required
                  />
                </div>

                {/* Project Proposal */}
                <div className="form-group">
                  <label htmlFor="proposal">Project Proposal: <span className="required">*</span></label>
                  <textarea 
                    id="proposal" 
                    name="proposal"
                    value={newProject.proposal}
                    onChange={handleInputChange}
                    className="form-input textarea"
                    rows="4"
                    placeholder="Enter project proposal details"
                    required
                  />
                </div>

                {/* Proposal Status */}
                <div className="form-group">
                  <label htmlFor="proposalStatus">Proposal Status:</label>
                  <select
                    id="proposalStatus"
                    name="proposalStatus"
                    value={newProject.proposalStatus}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Members Section */}
                <div className="form-section">
                  <h4>Project Members</h4>
                  {newProject.members.map((member, index) => (
                    <div key={index} className="form-section-item">
                      <div className="item-header">
                        <h5>Member {index + 1}</h5>
                        {index > 0 && (
                          <button 
                            type="button" 
                            className="remove-button"
                            onClick={() => removeMember(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Student ID: <span className="required">*</span></label>
                          <select
                            value={member.id}
                            onChange={(e) => handleMemberChange(index, 'id', e.target.value)}
                            className="form-input"
                            required
                          >
                            <option value="">Select Student</option>
                            {availableStudents.map(student => (
                              <option key={student.id} value={student.id}>{student.id} - {student.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Role: <span className="required">*</span></label>
                          <select
                            value={member.role}
                            onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                            className="form-input"
                            required
                          >
                            <option value="">Select Role</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Developer">Developer</option>
                            <option value="Researcher">Researcher</option>
                            <option value="Designer">Designer</option>
                            <option value="Tester">Tester</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Name:</label>
                        <input
                          type="text"
                          value={member.name}
                          className="form-input"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Email:</label>
                        <input
                          type="email"
                          value={member.email}
                          className="form-input"
                          disabled
                        />
                      </div>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-item-button"
                    onClick={addMember}
                  >
                    + Add Member
                  </button>
                </div>

                {/* Resources Section */}
                <div className="form-section">
                  <h4>Project Resources</h4>
                  {newProject.resources.map((resource, index) => (
                    <div key={index} className="form-section-item">
                      <div className="item-header">
                        <h5>Resource {index + 1}</h5>
                        {index > 0 && (
                          <button 
                            type="button" 
                            className="remove-button"
                            onClick={() => removeResource(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Resource Name: <span className="required">*</span></label>
                        <input
                          type="text"
                          value={resource.name}
                          onChange={(e) => handleResourceChange(index, 'name', e.target.value)}
                          className="form-input"
                          placeholder="Enter resource name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Resource Link: <span className="required">*</span></label>
                        <input
                          type="url"
                          value={resource.link}
                          onChange={(e) => handleResourceChange(index, 'link', e.target.value)}
                          className="form-input"
                          placeholder="https://example.com/resource"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Resource Type:</label>
                        <select
                          value={resource.type}
                          onChange={(e) => handleResourceChange(index, 'type', e.target.value)}
                          className="form-input"
                        >
                          <option value="Document">Document</option>
                          <option value="Code Repository">Code Repository</option>
                          <option value="Video">Video</option>
                          <option value="Tool">Tool</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-item-button"
                    onClick={addResource}
                  >
                    + Add Resource
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              <button 
                className="add-button" 
                onClick={handleAddProject}
                style={{
                  backgroundColor: "#192f5d",
                  color: "white"
                }}
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProjects;