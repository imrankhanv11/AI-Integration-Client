import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Terminal } from 'lucide-react';

const ChatWindow = ({ messages, isTyping, error }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, error]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-8 pb-32">
      <div className="max-w-3xl mx-auto h-full flex flex-col">
          
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50 select-none animate-message-entry">
            <Terminal size={48} className="text-accent mb-4 opacity-50" />
            <h2 className="font-mono text-xl tracking-widest text-text-primary mb-2">OBSIDIAN TERMINAL</h2>
            <p className="text-sm text-text-muted font-sans text-center max-w-sm">
              Premium AI conversational interface. Send a message to initialize connection.
            </p>
          </div>
        ) : (
          <div className="flex flex-col flex-1 pb-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {isTyping && <TypingIndicator />}
            
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mt-2 mb-4 text-sm flex items-center shadow-sm animate-message-entry backdrop-blur-sm self-center max-w-lg text-center">
                 <span className="mr-2 font-mono bg-red-900/50 px-2 py-0.5 rounded text-xs text-red-300">ERR</span> {error}
              </div>
            )}
            
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
