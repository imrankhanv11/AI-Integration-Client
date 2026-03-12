import React from 'react';
import { Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Tools Demo
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            Powered by AI
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
