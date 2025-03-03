import React, { useState, useEffect, useRef } from 'react';
import './SupportChatbot.css';

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: 'Hello! I\'m your BAU support assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple response generation based on user input
  const generateBotResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('login') || lowercaseInput.includes('sign in') || lowercaseInput.includes('password')) {
      return "If you're having trouble with login, please try resetting your password through the 'Forgot Password' link. If the issue persists, contact our IT support team at support@bau.edu with your student ID.";
    } else if (lowercaseInput.includes('assignment') || lowercaseInput.includes('submit') || lowercaseInput.includes('deadline')) {
      return "For assignment issues, please check the due date in your course syllabus. If you need an extension, contact your professor directly. For technical issues with submission, make sure your file is in the correct format (.pdf, .docx) and under the size limit.";
    } else if (lowercaseInput.includes('course') || lowercaseInput.includes('class') || lowercaseInput.includes('enroll')) {
      return "Course registration issues should be directed to your academic advisor. You can find their contact information in your profile section. Make sure to check the academic calendar for registration deadlines.";
    } else if (lowercaseInput.includes('grade') || lowercaseInput.includes('mark') || lowercaseInput.includes('score')) {
      return "If you have questions about your grades, first contact your course instructor directly. Allow up to 48 hours for a response. If you need further assistance, contact the department coordinator.";
    } else if (lowercaseInput.includes('thanks') || lowercaseInput.includes('thank you') || lowercaseInput.includes('helpful')) {
      return "You're welcome! I'm glad I could help. Is there anything else you'd like assistance with?";
    } else if (lowercaseInput.includes('bye') || lowercaseInput.includes('goodbye')) {
      return "Thank you for using BAU support. Have a great day!";
    } else {
      return "I understand you're asking about " + input + ". For more specific assistance, please contact our support team at support@bau.edu or call our helpdesk at +1-555-BAU-HELP during business hours (8am-5pm).";
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>BAU Support</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                <div className="message-content">{message.text}</div>
                <div className="message-time">{message.time}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message typing-indicator">
                <div className="dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
      <button 
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default SupportChatbot;