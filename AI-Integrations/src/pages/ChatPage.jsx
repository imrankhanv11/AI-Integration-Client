import React, { useState } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: 'This is a demo response. In a real implementation, this would connect to an AI service.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          <div className="ml-8 flex items-center space-x-2">
            <Bot className="text-indigo-600" size={24} />
            <h1 className="text-xl font-semibold text-gray-900">AI Chat Bot</h1>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User size={20} className="text-white" />
                  ) : (
                    <Bot size={20} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send size={18} />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
