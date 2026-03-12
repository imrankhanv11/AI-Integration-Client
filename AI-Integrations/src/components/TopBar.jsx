import React from 'react';
import { Terminal, Sparkles } from 'lucide-react';

const TopBar = () => {
  return (
    <header className="h-14 border-b border-border-subtle flex items-center justify-between px-6 bg-primary z-10 sticky top-0">
      <div className="flex items-center space-x-3">
        <Terminal className="text-accent" size={20} />
        <h1 className="font-mono text-sm font-medium tracking-wide text-text-primary">
          OBSIDIAN<span className="text-accent ml-1">TERMINAL</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 px-3 py-1 bg-elevated border border-border-subtle rounded-full cursor-pointer hover:border-accent/40 transition-colors">
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-mono text-text-primary">Model: GPT-4o</span>
        </div>
        
        {/* 'Online' indicator */}
        <div className="flex items-center space-x-2">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-mono text-text-muted">System Operational</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
