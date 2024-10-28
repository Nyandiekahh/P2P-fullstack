import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, X, ExternalLink, MessageCircle } from 'lucide-react';

const styles = {
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '380px',
    maxWidth: '95vw',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 1000,
    fontFamily: "'Inter', sans-serif",
  },
  
  chatHeader: {
    padding: '20px',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  messagesContainer: {
    height: '450px',
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#f8fafc',
  },
  
  optionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px',
  },
  
  optionButton: {
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
    color: '#4F46E5',
    '&:hover': {
      backgroundColor: '#4F46E5',
      color: 'white',
    },
  },
  
  developerCard: {
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '10px',
    marginBottom: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  whatsappButton: {
    backgroundColor: '#25D366',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#128C7E',
    },
  },
};

const chatFlows = {
  initial: {
    message: "👋 Hello! I'm your P2P Lending Assistant. How can I help you today?",
    options: [
      { label: "Learn about P2P Lending", value: "learn" },
      { label: "How to Invest", value: "invest" },
      { label: "How to Borrow", value: "borrow" },
      { label: "Contact Developers", value: "contact" },
      { label: "Technical Support", value: "support" },
    ]
  },
  learn: {
    message: "P2P Lending connects borrowers directly with lenders. What would you like to know more about?",
    options: [
      { label: "How it Works", value: "howItWorks" },
      { label: "Benefits", value: "benefits" },
      { label: "Security Measures", value: "security" },
      { label: "Back to Main Menu", value: "initial" },
    ]
  },
  invest: {
    message: "Ready to grow your money? Here's what you need to know about investing:",
    options: [
      { label: "Investment Process", value: "investProcess" },
      { label: "Expected Returns", value: "returns" },
      { label: "Risk Management", value: "risks" },
      { label: "Back to Main Menu", value: "initial" },
    ]
  },
  borrow: {
    message: "Need a loan? Let me guide you through the borrowing process:",
    options: [
      { label: "Loan Requirements", value: "requirements" },
      { label: "Interest Rates", value: "rates" },
      { label: "Application Process", value: "application" },
      { label: "Back to Main Menu", value: "initial" },
    ]
  },
  contact: {
    message: "Our development team is here to help! Who would you like to contact?",
    options: [
      { label: "Einstein Mokua - Lead Developer", value: "einstein" },
      { label: "Cynthia Otara - Frontend Developer", value: "cynthia" },
      { label: "Daniel Joel - Backend Developer", value: "daniel" },
      { label: "Fiona Ombura - UI/UX Designer", value: "fiona" },
      { label: "Ivy Jepkemboi - QA Engineer", value: "ivy" },
      { label: "Back to Main Menu", value: "initial" },
    ]
  }
};

const developers = [
  {
    name: "Einstein Mokua",
    role: "Lead Developer",
    phone: "+254719408098",
    specialty: "Full Stack Development"
  },
  {
    name: "Cynthia Otara",
    role: "Frontend Developer",
    phone: "+254705070531",
    specialty: "React & UI Components"
  },
  {
    name: "Daniel Joel",
    role: "Backend Developer",
    phone: "+254797212846",
    specialty: "API & Database Architecture"
  },
  {
    name: "Fiona Ombura",
    role: "UI/UX Designer",
    phone: "+254748913590",
    specialty: "User Experience & Design"
  },
  {
    name: "Ivy Jepkemboi",
    role: "QA Engineer",
    phone: "+254722687259",
    specialty: "Quality Assurance & Testing"
  }
];

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [currentFlow, setCurrentFlow] = useState('initial');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = chatFlows.initial;
      setMessages([{
        role: 'assistant',
        content: initialMessage.message,
        options: initialMessage.options
      }]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOptionClick = (option) => {
    // Add user's selection to messages
    setMessages(prev => [...prev, {
      role: 'user',
      content: option.label
    }]);

    if (option.value === 'initial') {
      const flow = chatFlows.initial;
      setCurrentFlow('initial');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: flow.message,
        options: flow.options
      }]);
      return;
    }

    // Handle developer contact options
    if (['einstein', 'cynthia', 'daniel', 'fiona', 'ivy'].includes(option.value)) {
      const developer = developers.find(dev => 
        dev.name.toLowerCase().includes(option.value)
      );
      
      if (developer) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Developer Information',
          developer: developer,
          isDeveloperCard: true
        }]);
      }
      return;
    }

    // Handle other flows
    const flow = chatFlows[option.value];
    if (flow) {
      setCurrentFlow(option.value);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: flow.message,
        options: flow.options
      }]);
    }
  };

  const handleWhatsAppClick = (phone) => {
    window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div style={styles.chatbotContainer}>
      <div style={styles.chatHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={24} />
          <div>
            <div style={{ fontWeight: 600 }}>P2P Assistant</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Always here to help</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>
      </div>

      <div style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            {message.isDeveloperCard ? (
              <div style={styles.developerCard}>
                <div>
                  <div style={{ fontWeight: 600 }}>{message.developer.name}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{message.developer.role}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>{message.developer.specialty}</div>
                </div>
                <button
                  onClick={() => handleWhatsAppClick(message.developer.phone)}
                  style={styles.whatsappButton}
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
              </div>
            ) : (
              <>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
                }}>
                  {message.role === 'assistant' && <Bot size={24} color="#4F46E5" />}
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: message.role === 'user' ? '#4F46E5' : 'white',
                    color: message.role === 'user' ? 'white' : 'black',
                    borderRadius: '12px',
                    maxWidth: '80%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  }}>
                    {message.content}
                  </div>
                  {message.role === 'user' && <User size={24} color="#4F46E5" />}
                </div>
                {message.options && (
                  <div style={styles.optionsContainer}>
                    {message.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleOptionClick(option)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#f3f4f6',
                          border: '1px solid #e5e7eb',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'all 0.2s',
                          color: '#4F46E5',
                          '&:hover': {
                            backgroundColor: '#4F46E5',
                            color: 'white',
                          }
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chatbot;