import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const CodeBlock = ({ inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="relative group rounded-md overflow-hidden my-4 border border-border-subtle bg-[#1e1e1e]">
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#2d2d2d] border-b border-[#404040]">
           <span className="text-xs font-mono text-gray-400">{lang}</span>
           <button
             onClick={handleCopy}
             className="text-gray-400 hover:text-white transition-colors p-1"
             title="Copy code"
           >
             {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
           </button>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={lang}
          PreTag="div"
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full animate-message-entry mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-accent/20 flex flex-shrink-0 items-center justify-center mr-3 mt-1 shadow-[0_0_10px_var(--color-accent-glow)] relative">
           <div className="absolute inset-0 bg-accent/10 rounded-full"></div>
           <span className="text-accent text-xs font-bold font-mono">AI</span>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`relative group max-w-[85%] px-5 py-3.5 shadow-sm text-[15px] leading-relaxed 
          ${isUser 
            ? 'bg-user-bubble text-text-primary rounded-2xl rounded-tr-sm border border-border-subtle/50' 
            : 'bg-ai-bubble text-text-primary rounded-2xl rounded-tl-sm border border-border-subtle'
          }
        `}
      >
        <div className={`markdown-body ${!isUser ? 'font-[450]' : ''}`}>
           {isUser ? (
             <p className="whitespace-pre-wrap">{message.content}</p>
           ) : (
             <ReactMarkdown
               components={{
                 code: CodeBlock
               }}
             >
                {message.content}
             </ReactMarkdown>
           )}
        </div>
        
        {/* Timestamp */}
        <div className={`text-[10px] font-mono text-text-muted mt-2 ${isUser ? 'text-right' : 'text-left'} opacity-0 group-hover:opacity-100 transition-opacity`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
