import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const switchTab = (tab) => {
    setActiveTab(tab);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleLogin = () => {
    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    if (activeTab === 'student') {
      // For demonstration, this would typically involve an API call to validate credentials
      console.log('Student logged in:', username);
      
      // Store user information in sessionStorage
      const userInfo = {
        name: username,
        id: username, 
        type: 'student'
      };
      
      // Make sure to stringify the object when storing in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(userInfo));
      
      // Navigate to student dashboard
      navigate('/student-dashboard'); 
    } else {
      // For demonstration, this would typically involve an API call to validate credentials
      console.log('Admin logged in:', username);
      
      // Store user information in sessionStorage
      const userInfo = {
        name: username,
        id: username,
        type: 'admin'
      };
      
      // Make sure to stringify the object when storing in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(userInfo));
      
      // Navigate to admin dashboard
      navigate('/admin-dashboard'); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/images/bau-logo.jpg" alt="BAU Logo" className="login-logo" />
        <h2>{activeTab === 'student' ? 'Student Login' : 'Admin Login'}</h2>
        <div className="login-tabs">
          <button 
            className={activeTab === 'student' ? 'active' : ''} 
            onClick={() => switchTab('student')}
          >
            Student Login
          </button>
          <button 
            className={activeTab === 'admin' ? 'active' : ''} 
            onClick={() => switchTab('admin')}
          >
            Admin Login
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <input 
          type="text" 
          placeholder={activeTab === 'student' ? 'Student ID' : 'Admin Username'} 
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          {activeTab === 'student' ? 'Student Login' : 'Admin Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;