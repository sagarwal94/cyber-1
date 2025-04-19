import React, { useState, useEffect, useRef } from "react";
import "./SupportChatbot.css";

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I am your school assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [schoolInfo, setSchoolInfo] = useState("");
  const messagesEndRef = useRef(null);

  // Load school info from file on component mount
  useEffect(() => {
    fetch("/school-info.txt")
      .then((response) => response.text())
      .then((data) => setSchoolInfo(data))
      .catch((error) => console.error("Error loading school info:", error));
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    const botMessage = {
      id: messages.length + 2,
      sender: "bot",
      text: "",
      time: "",
    };
    setMessages((prev) => [...prev, botMessage]);

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2", // Change to your actual model name
          prompt: `You are an AI assistant for BAU University, dedicated to answering questions specifically related to this institution. You provide accurate and relevant information about courses, admissions, facilities, events, and other aspects of the college. ,Context:\n${schoolInfo}\n\nUser: ${inputText}\n\nAssistant:`,
          stream: true,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Decode chunk and parse JSON
        const jsonString = decoder.decode(value, { stream: true }).trim();
        const jsonLines = jsonString.split("\n"); // Handle multiple JSON objects

        for (const line of jsonLines) {
          try {
            const jsonData = JSON.parse(line);
            if (jsonData.response) {
              botResponse += jsonData.response; // Append the response text

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMessage.id ? { ...msg, text: botResponse } : msg
                )
              );
            }
          } catch (error) {
            console.error("JSON parse error:", error, "Data:", line);
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>School Chatbot</h3>
            <button className="close-button" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "bot" ? "bot-message" : "user-message"
                }`}
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
              placeholder="Ask me about the school..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        className={`chat-toggle-button ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default SupportChatbot;
