import { useState, useRef, useEffect } from 'react';
import { Send, Circle } from 'lucide-react';

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  // Sample quick replies
  const quickReplies = [
    "Tell me about paracetamol",
    "What are common cold medicines?",
    "How to find medicine prices?",
    "What's the difference between generic and branded medicines?"
  ];

  // Sample responses (for testing)
  const aiResponses = {
    "What's a healthy breakfast?": {
      text: "A healthy breakfast should include proteins, whole grains, and fruits. Here are some suggestions:",
      suggestions: [
        "Oatmeal with berries and nuts",
        "Whole grain toast with eggs and avocado",
        "Greek yogurt parfait with granola",
        "Smoothie bowl with seeds and fruits"
      ]
    },
    "How to reduce stress?": {
      text: "Here are some effective stress management techniques:",
      suggestions: [
        "Deep breathing exercises",
        "Regular physical activity",
        "Meditation and mindfulness",
        "Adequate sleep (7-9 hours)",
        "Time management and breaks"
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

    // Call backend for AI response using Gemini
    try {
      const context = text.toLowerCase().includes('medicine') || text.toLowerCase().includes('drug') ? 'medicine' : 'general';
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context }),
      });
      const data = await res.json();
      const aiMessage = {
        id: Date.now() + 1,
        text: data.response || "Sorry, I couldn't process your request.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, there was an error contacting the AI. Please try again.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsTyping(false);
    }
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
        {/* Header */}
        <div className="chat-header">
          <h2>AI Health Assistant</h2>
          <div className="status">
            <Circle className="status-dot" size={8} />
            <span>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {showQuickReplies && (
            <div className="quick-replies-container">
              <p className="quick-replies-title">How can I help you today?</p>
              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply"
                    onClick={() => handleSend(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                {message.suggestions && (
                  <ul className="suggestions">
                    {message.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <div className="input-wrapper">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
              className="message-input"
            />
            <button 
              className="send-button"
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-page {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .chat-container {
          width: 100%;
          max-width: 800px;
          height: 600px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        }

        .chat-header h2 {
          margin: 0 0 4px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #6b7280;
        }

        .status-dot {
          color: #10b981;
          fill: currentColor;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .quick-replies-container {
          margin-bottom: 24px;
        }

        .quick-replies-title {
          margin: 0 0 12px 0;
          font-size: 15px;
          color: #374151;
          font-weight: 500;
        }

        .quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .quick-reply {
          background: white;
          border: 1px solid #d1d5db;
          color: #374151;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-reply:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .message {
          max-width: 70%;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .message.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .message.ai {
          align-self: flex-start;
          align-items: flex-start;
        }

        .message-content {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.4;
        }

        .message.user .message-content {
          background: #2563eb;
          color: white;
        }

        .message.ai .message-content {
          background: #f3f4f6;
          color: #111827;
        }

        .message-text {
          margin: 0;
        }

        .suggestions {
          margin: 8px 0 0 0;
          padding: 0;
          list-style: none;
        }

        .suggestions li {
          margin: 4px 0;
          padding: 4px 0;
          font-size: 14px;
          opacity: 0.9;
        }

        .timestamp {
          font-size: 12px;
          color: #9ca3af;
          margin: 0 16px;
        }

        .typing-indicator {
          max-width: 70%;
          align-self: flex-start;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
          padding: 16px;
          background: #f3f4f6;
          border-radius: 18px;
          width: fit-content;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: #9ca3af;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        .dot:nth-child(3) { animation-delay: 0s; }

        .chat-input-container {
          padding: 16px 20px;
          border-top: 1px solid #e5e7eb;
          background: white;
        }

        .input-wrapper {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .message-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 24px;
          font-size: 15px;
          resize: none;
          outline: none;
          background: white;
          transition: border-color 0.2s ease;
          min-height: 44px;
          max-height: 120px;
        }

        .message-input:focus {
          border-color: #2563eb;
        }

        .send-button {
          width: 44px;
          height: 44px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .send-button:hover:not(:disabled) {
          background: #1d4ed8;
        }

        .send-button:disabled {
          background: #d1d5db;
          color: #9ca3af;
          cursor: not-allowed;
        }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 768px) {
          .chat-page {
            padding: 0;
          }

          .chat-container {
            height: 100vh;
            border-radius: 0;
            border: none;
          }

          .message {
            max-width: 85%;
          }

          .quick-replies {
            flex-direction: column;
          }

          .quick-reply {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AIChatPage;