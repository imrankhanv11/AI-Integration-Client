import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex animate-message-entry mb-4 items-end">
      {/* Small Glowing AI Dot */}
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 mt-1 shadow-[0_0_10px_var(--color-accent-glow)] flex-shrink-0 relative overflow-hidden">
         <div className="absolute inset-0 bg-accent/30 animate-pulse rounded-full"></div>
         <span className="text-accent text-xs font-bold font-mono">AI</span>
      </div>
      
      <div className="bg-[var(--ai-bubble)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm inline-block max-w-[85%] relative group">
        <div className="flex items-center space-x-1.5 h-6">
          <div className="w-2 h-2 rounded-full bg-accent typing-dot"></div>
          <div className="w-2 h-2 rounded-full bg-accent typing-dot"></div>
          <div className="w-2 h-2 rounded-full bg-accent typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
