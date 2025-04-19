import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDiscussions.css';

const StudentDiscussions = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [newTopicName, setNewTopicName] = useState('');
  const [activeTab, setActiveTab] = useState('discussion');
  const [userData, setUserData] = useState({
    name: "",
    id: ""
  });

  
  useEffect(() => {
    
    const loadUserData = () => {
      try {
        const userString = sessionStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          setUserData({
            name: user.name || "Student",
            id: user.id || "ID not found"
          });
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        navigate('/');
      }
    };

    
    const loadSampleTopics = () => {
      const sampleTopics = [
        {
          id: 1,
          title: "Cybersecurity Ethics in Modern Environments",
          createdBy: "Siva Abishikth",
          date: "2024-01-15",
          status: "active",
          participants: 12,
          lastActivity: "2024-02-25",
          messages: [
            {
              id: 1,
              user: "Siva Abishikth",
              date: "2024-01-15",
              content: "I'd like to discuss the ethical implications of penetration testing without explicit consent. Where do we draw the line between security research and illegal activities?"
            },
            {
              id: 2,
              user: "Sonal",
              date: "2024-01-16",
              content: "Great question! I believe the key is documentation and scope. Always have written permission and clearly defined boundaries before any testing."
            }
          ]
        },
        {
          id: 2,
          title: "Machine Learning Applications in Network Security",
          createdBy: "Guarav",
          date: "2024-01-20",
          status: "done",
          participants: 8,
          lastActivity: "2024-02-10",
          messages: [
            {
              id: 1,
              user: "Guarav",
              date: "2024-01-20",
              content: "Has anyone implemented ML algorithms for anomaly detection in network traffic? What was your experience and which algorithms worked best?"
            }
          ]
        }
      ];
      
      setTopics(sampleTopics);
    };
    
    loadUserData();
    loadSampleTopics();
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleAddTopic = () => {
    if (!newTopicName.trim()) {
      alert("Please enter a topic name");
      return;
    }
    
    const newTopic = {
      id: topics.length + 1,
      title: newTopicName,
      createdBy: userData.name,
      date: new Date().toISOString().split('T')[0],
      status: "active",
      participants: 1,
      lastActivity: new Date().toISOString().split('T')[0],
      messages: [
        {
          id: 1,
          user: userData.name,
          date: new Date().toISOString().split('T')[0],
          content: "Topic created. Add your discussion here."
        }
      ]
    };
    
    setTopics([...topics, newTopic]);
    setNewTopicName('');
  };

  const handleTopicStatusChange = (topicId) => {
    setTopics(topics.map(topic => 
      topic.id === topicId 
        ? {...topic, status: topic.status === 'active' ? 'done' : 'active'} 
        : topic
    ));
  };

  const handleViewParticipants = (topicId) => {
    
    const topic = topics.find(t => t.id === topicId);
    alert(`${topic.participants} participants in this discussion`);
  };

  const filteredTopics = topics.filter(topic => 
    activeTab === 'all' || 
    (activeTab === 'active' && topic.status === 'active') ||
    (activeTab === 'done' && topic.status === 'done')
  );

  return (
    <div className="discussions-container">
      <div className="discussions-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>Discussions</h2>
      </div>

      <div className="topic-input-container">
        <input
          type="text"
          className="topic-input"
          placeholder="Topic Name"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
        />
      </div>

      <div className="action-buttons">
        <button className="add-topic-button" onClick={handleAddTopic}>
          Add discussion topic
        </button>
        <button className="participants-button" onClick={() => setActiveTab('participants')}>
          Participants
        </button>
      </div>

      <div className="discussions-tabs">
        <button 
          className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button 
          className={`tab-button ${activeTab === 'done' ? 'active' : ''}`}
          onClick={() => setActiveTab('done')}
        >
          Done
        </button>
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
      </div>

      <div className="topics-list">
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <div key={topic.id} className={`topic-card ${topic.status === 'done' ? 'done' : ''}`}>
              <div className="topic-header">
                <h3>{topic.title}</h3>
                <div className="topic-meta">
                  <span>Created by: {topic.createdBy}</span>
                  <span>Date: {topic.date}</span>
                </div>
              </div>
              
              <div className="topic-actions">
                <button 
                  className={`status-button ${topic.status === 'done' ? 'done' : ''}`}
                  onClick={() => handleTopicStatusChange(topic.id)}
                >
                  {topic.status === 'done' ? (
                    <span>✓ Done</span>
                  ) : (
                    'Mark as Done'
                  )}
                </button>
                <button 
                  className="view-button"
                  onClick={() => navigate(`/student-dashboard/discussion/${topic.id}`)}
                >
                  View Discussion
                </button>
                <button 
                  className="participants-button small"
                  onClick={() => handleViewParticipants(topic.id)}
                >
                  Participants ({topic.participants})
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-topics">
            <p>No discussion topics found in this category.</p>
            <button className="add-topic-button" onClick={handleAddTopic}>
              Create your first discussion topic
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDiscussions;