import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  // Sample quick replies
  const quickReplies = [
    "What's a healthy breakfast?",
    "How to reduce stress?",
    "Common cold remedies",
    "Best time to exercise?"
  ];

  // Sample responses (for testing)
  const aiResponses = {
    "What's a healthy breakfast?": {
      text: "A healthy breakfast should include proteins, whole grains, and fruits. Here are some suggestions:",
      suggestions: [
        "1. Oatmeal with berries and nuts",
        "2. Whole grain toast with eggs and avocado",
        "3. Greek yogurt parfait with granola",
        "4. Smoothie bowl with seeds and fruits"
      ]
    },
    "How to reduce stress?": {
      text: "Here are some effective stress management techniques:",
      suggestions: [
        "• Deep breathing exercises",
        "• Regular physical activity",
        "• Meditation and mindfulness",
        "• Adequate sleep (7-9 hours)",
        "• Time management and breaks"
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = inputText) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowQuickReplies(false);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = aiResponses[text] || {
        text: "I understand you're asking about " + text + ". Let me help you with that.",
        suggestions: ["This is a test response. In the real implementation, this will be connected to the AI backend."]
      };

      const aiMessage = {
        id: Date.now(),
        text: response.text,
        suggestions: response.suggestions,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <motion.div 
          className="chat-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>AI Health Assistant</h2>
          <div className="status">
            <span className="status-dot"></span>
            Online
          </div>
        </motion.div>

        <div className="messages-container">
          <AnimatePresence>
            {showQuickReplies && (
              <motion.div 
                className="quick-replies-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <h3>How can I help you today?</h3>
                <div className="quick-replies">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      className="quick-reply"
                      onClick={() => handleSend(reply)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.sender}`}
                initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.suggestions && (
                    <ul className="suggestions">
                      {message.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className="timestamp">{message.timestamp}</span>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                className="typing-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <motion.div 
          className="chat-input-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows="1"
          />
          <button 
            className="send-button"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatPage; 