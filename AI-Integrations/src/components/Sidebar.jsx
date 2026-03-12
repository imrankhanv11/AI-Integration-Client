import React from 'react';
import { Terminal, Plus, MessageSquare } from 'lucide-react';

const Sidebar = ({ conversations, activeId, onSelect, onNew }) => {
  return (
    <aside className="w-[260px] h-full bg-secondary border-r border-border-subtle flex flex-col shrink-0">
      <div className="p-4">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center space-x-2 bg-accent hover:bg-accent/90 text-white py-2.5 px-4 rounded-md transition-all duration-200 group shadow-[0_0_15px_var(--color-accent-glow)] font-medium text-sm"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        <h3 className="px-4 text-xs font-mono text-text-muted mb-3 uppercase tracking-wider">Recent</h3>
        
        {conversations.length === 0 ? (
           <div className="px-4 text-sm text-text-muted font-mono h-32 flex items-center justify-center">No history.</div>
        ) : (
          <nav className="space-y-1 px-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full text-left flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 relative group overflow-hidden ${
                  activeId === conv.id
                    ? 'bg-elevated text-text-primary shadow-sm'
                    : 'text-text-muted hover:bg-elevated/50 hover:text-text-primary'
                }`}
              >
                {/* Active Indicator Bar */}
                {activeId === conv.id && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-accent rounded-r-full shadow-[0_0_10px_var(--color-accent)] animate-message-entry"></div>
                )}
                
                <MessageSquare size={16} className={`shrink-0 ${activeId === conv.id ? 'text-accent' : 'text-text-muted group-hover:text-text-primary transition-colors'}`} />
                <div className="flex-1 truncate">
                  <p className="text-sm truncate pr-2">{conv.title}</p>
                </div>
              </button>
            ))}
          </nav>
        )}
      </div>
      
      {/* Footer / User Profile Area */}
      <div className="p-4 border-t border-border-subtle flex items-center space-x-3 hover:bg-elevated/50 cursor-pointer transition-colors duration-200">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-800 flex items-center justify-center text-white text-sm font-bold shadow-md">
          U
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">User</p>
          <p className="text-xs text-text-muted font-mono truncate">Pro Plan</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
