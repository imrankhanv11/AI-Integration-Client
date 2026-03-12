import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentAnalyzerPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResult(`Analysis complete for "${file.name}"\n\nKey Findings:\n• Document Type: PDF/Text Document\n• Word Count: ~${Math.floor(Math.random() * 5000 + 1000)} words\n• Main Topics: Technology, AI, Machine Learning\n• Sentiment: Positive\n• Summary: This document discusses the implementation of AI technologies in modern software development workflows.`);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <FileText className="text-emerald-600" size={24} />
            <h1 className="text-xl font-semibold text-gray-900">Document Analyzer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Document</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="text-emerald-600" size={32} />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {file ? file.name : 'Click to upload a document'}
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX, TXT (max 10MB)
              </p>
            </label>
          </div>

          {file && (
            <div className="mt-6 flex items-center space-x-3">
              <CheckCircle className="text-emerald-500" size={20} />
              <span className="text-gray-700">{file.name}</span>
              <span className="text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className="mt-6 w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
          </button>
        </div>

        {/* Results Section */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-200 rounded-full mb-4"></div>
              <p className="text-gray-600">Analyzing your document...</p>
            </div>
          </div>
        )}

        {result && !isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="text-emerald-500" size={24} />
              <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DocumentAnalyzerPage;
