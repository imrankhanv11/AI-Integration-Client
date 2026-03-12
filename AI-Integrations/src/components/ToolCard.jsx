import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ title, description, icon: Icon, navigateTo, color }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(navigateTo)}
      className="group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
    >
      <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={32} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">
        <span>Get Started</span>
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default ToolCard;
