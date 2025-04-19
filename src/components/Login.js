import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    if (activeTab === 'student') {
      console.log('Student logged in:', username);
      
      const userInfo = {
        name: username,
        id: username, 
        type: 'student'
      };
      
      sessionStorage.setItem('user', JSON.stringify(userInfo));
      navigate('/student-dashboard'); 
    } else {
      console.log('Admin logged in:', username);
      
      const userInfo = {
        name: username,
        id: username,
        type: 'admin'
      };
      
      sessionStorage.setItem('user', JSON.stringify(userInfo));
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
        
        {activeTab === 'student' && (
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;