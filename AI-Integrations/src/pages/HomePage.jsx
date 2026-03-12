import React from 'react';
import { MessageSquare, FileText, PenTool } from 'lucide-react';
import Header from '../components/Header';
import ToolCard from '../components/ToolCard';

const HomePage = () => {
  const tools = [
    {
      title: 'Chat Bot',
      description: 'Ask questions and get AI responses.',
      icon: MessageSquare,
      navigateTo: '/chat',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      title: 'Document Analyzer',
      description: 'Upload and analyze documents using AI.',
      icon: FileText,
      navigateTo: '/document',
      color: 'bg-gradient-to-br from-emerald-500 to-teal-500'
    },
    {
      title: 'Content Generator',
      description: 'Generate blogs, posts, and summaries.',
      icon: PenTool,
      navigateTo: '/content',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to AI Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a tool below to get started with our AI-powered features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              navigateTo={tool.navigateTo}
              color={tool.color}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
