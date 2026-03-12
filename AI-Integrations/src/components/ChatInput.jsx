import React, { useRef, useEffect } from 'react';
import { Send, CornerDownLeft } from 'lucide-react';

const ChatInput = ({ input, setInput, onSubmit, isTyping, maxLength = 2000 }) => {
  const textareaRef = useRef(null);

  // Auto resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset size
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`; // Limit max to 150px
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const isOverLimit = input.length > maxLength;

  return (
    <div className="w-full relative px-6 pb-6 pt-2 bg-gradient-to-t from-primary via-primary to-transparent shrink-0 z-10">
      <div className="max-w-3xl mx-auto relative group">
        
        {/* Glow behind input on focus/hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-purple-600/50 rounded-2xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500 pointer-events-none"></div>
        
        <div className="relative bg-elevated rounded-2xl border border-border-subtle shadow-xl overflow-hidden flex flex-col transition-colors group-focus-within:border-accent/50">
          
          <textarea
            ref={textareaRef}
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            style={{ minHeight: '52px', maxHeight: '150px' }}
            className="w-full bg-transparent text-text-primary px-4 py-3.5 focus:outline-none resize-none disabled:opacity-50 overflow-y-auto font-sans leading-relaxed text-[15px]"
            rows={1}
          />

          <div className="flex items-center justify-between px-3 pb-2 pt-1 h-[32px]">
             {/* Character Count */}
             <div className="pl-2 flex items-center text-xs font-mono">
                {input.length > 200 && (
                   <span className={isOverLimit ? 'text-red-400' : 'text-text-muted'}>
                      {input.length} / {maxLength}
                   </span>
                )}
             </div>

             {/* Send Button */}
             <button
               onClick={onSubmit}
               disabled={!input.trim() || isTyping || isOverLimit}
               className="h-8 w-8 !p-0 flex items-center justify-center rounded-lg bg-accent hover:bg-accent/90 disabled:bg-elevated disabled:text-text-muted text-white transition-all duration-200 transform hover:scale-[1.05] shadow-[0_0_10px_var(--color-accent-glow)] disabled:shadow-none ease-out group"
               title="Send message (Enter)"
             >
               <Send size={15} className={`transition-transform duration-200 ${input.trim() ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : ''}`} />
             </button>
          </div>
        </div>
        
        <div className="text-center mt-2.5">
          <p className="text-[10px] text-text-muted font-mono tracking-wide">
             <CornerDownLeft size={10} className="inline mr-1 pb-0.5" /> ENTER TO SEND / SHIFT+ENTER FOR NEWLINE
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default ChatInput;
