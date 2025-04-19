import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DiscussionDetail.css';

const DiscussionDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState({
    name: "",
    id: ""
  });
  const [loading, setLoading] = useState(true);

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

    
    const loadTopicData = () => {
      
      setTimeout(() => {
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
              },
              {
                id: 3,
                user: "Guarav",
                date: "2024-01-17",
                content: "I agree with Alex. Additionally, it's important to consider the potential impact of your testing. Even with permission, you should avoid actions that could disrupt critical services or compromise sensitive data unnecessarily."
              },
              {
                id: 4,
                user: "frukan",
                date: "2024-01-18",
                content: "There's also the matter of responsible disclosure. If you find vulnerabilities, you should report them to the organization first and give them time to fix the issues before making them public."
              }
            ]
          },
          {
            id: 2,
            title: "Machine Learning Applications in Network Security",
            createdBy: "Sonal",
            date: "2024-01-20",
            status: "done",
            participants: 8,
            lastActivity: "2024-02-10",
            messages: [
              {
                id: 1,
                user: "Sonal",
                date: "2024-01-20",
                content: "Has anyone implemented ML algorithms for anomaly detection in network traffic? What was your experience and which algorithms worked best?"
              },
              {
                id: 2,
                user: "Druvan",
                date: "2024-01-21",
                content: "We've had success with isolation forests for detecting unusual patterns in our network. They're particularly good at identifying outliers without needing labeled data."
              },
              {
                id: 3,
                user: "Drovan",
                date: "2024-01-22",
                content: "We've been using a combination of LSTM networks and autoencoders. The LSTM helps with the sequential nature of network traffic, while autoencoders are great for dimensionality reduction and anomaly detection."
              }
            ]
          }
        ];
        
        const foundTopic = sampleTopics.find(t => t.id === parseInt(topicId));
        if (foundTopic) {
          setTopic(foundTopic);
        } else {
          alert("Topic not found");
          navigate('/student-dashboard/discussions');
        }
        setLoading(false);
      }, 500);
    };
    
    loadUserData();
    loadTopicData();
  }, [topicId, navigate]);

  const handleBackToDiscussions = () => {
    navigate('/student-dashboard/discussions');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      alert("Please enter a message");
      return;
    }
    
    const newMsg = {
      id: topic.messages.length + 1,
      user: userData.name,
      date: new Date().toISOString().split('T')[0],
      content: newMessage
    };
    
    setTopic({
      ...topic,
      messages: [...topic.messages, newMsg],
      lastActivity: new Date().toISOString().split('T')[0]
    });
    
    setNewMessage('');
  };

  const handleStatusChange = () => {
    setTopic({
      ...topic,
      status: topic.status === 'active' ? 'done' : 'active'
    });
  };

  if (loading) {
    return (
      <div className="discussion-detail-container">
        <div className="loading">Loading discussion...</div>
      </div>
    );
  }

  return (
    <div className="discussion-detail-container">
      <div className="discussion-header">
        <button className="back-button" onClick={handleBackToDiscussions}>
          ← Back to Discussions
        </button>
        <h2>{topic.title}</h2>
        <div className="topic-meta">
          <span>Created by: {topic.createdBy}</span>
          <span>Date: {topic.date}</span>
          <span>Status: {topic.status === 'done' ? 'Completed' : 'Active'}</span>
        </div>
      </div>

      <div className="discussion-actions">
        <button 
          className={`status-button ${topic.status === 'done' ? 'done' : ''}`}
          onClick={handleStatusChange}
        >
          {topic.status === 'done' ? '✓ Done' : 'Mark as Done'}
        </button>
        <button className="participants-button">
          Participants ({topic.participants})
        </button>
      </div>

      <div className="messages-container">
        <h3>Discussion</h3>
        {topic.messages.map((message) => (
          <div 
            key={message.id} 
            className={`message-card ${message.user === userData.name ? 'own-message' : ''}`}
          >
            <div className="message-header">
              <span className="message-user">{message.user}</span>
              <span className="message-date">{message.date}</span>
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="message-input-container">
        <textarea 
          className="message-input"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows={4}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default DiscussionDetail;