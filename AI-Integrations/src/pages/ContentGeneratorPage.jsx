import React, { useState } from 'react';
import { ArrowLeft, PenTool, Sparkles, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContentGeneratorPage = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { value: 'blog', label: 'Blog Post' },
    { value: 'social', label: 'Social Media Post' },
    { value: 'summary', label: 'Summary' },
    { value: 'email', label: 'Email' }
  ];

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setGeneratedContent(null);

    // Simulate content generation
    setTimeout(() => {
      const templates = {
        blog: `# ${topic}\n\n## Introduction\n\nIn today's rapidly evolving landscape, ${topic} has become increasingly important. This comprehensive guide explores the key aspects and provides actionable insights.\n\n## Key Points\n\n1. **Understanding the Basics**: Start with the fundamentals to build a strong foundation.\n2. **Advanced Strategies**: Implement cutting-edge techniques for optimal results.\n3. **Best Practices**: Follow industry standards to ensure success.\n\n## Conclusion\n\nBy following these guidelines, you'll be well-equipped to leverage ${topic} effectively in your projects.`,
        social: `🚀 Excited to share insights about ${topic}!\n\nKey takeaways:\n✨ Innovation drives success\n✨ Consistency matters\n✨ Always keep learning\n\nWhat are your thoughts on ${topic}? Drop a comment below! 👇\n\n#Innovation #Growth #Learning`,
        summary: `## Summary: ${topic}\n\n**Overview**: ${topic} represents a significant development in its field, offering numerous benefits and opportunities.\n\n**Main Points**:\n• Enhances productivity and efficiency\n• Reduces operational costs\n• Improves user experience\n• Enables scalable solutions\n\n**Conclusion**: Adopting ${topic} can lead to substantial improvements in performance and outcomes.`,
        email: `Subject: Important Update Regarding ${topic}\n\nDear Team,\n\nI hope this email finds you well. I'm writing to share important information about ${topic}.\n\n**Key Updates**:\n• Implementation scheduled for next quarter\n• Training sessions will be provided\n• Resources and documentation available\n\nPlease review the attached materials and let me know if you have any questions.\n\nBest regards,\n[Your Name]`
      };

      setGeneratedContent(templates[contentType] || templates.blog);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
            <PenTool className="text-purple-600" size={24} />
            <h1 className="text-xl font-semibold text-gray-900">Content Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Content</h2>

          {/* Content Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
            <div className="flex flex-wrap gap-3">
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setContentType(type.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    contentType === type.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Artificial Intelligence in Healthcare"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
          >
            <Sparkles size={18} />
            <span>{isGenerating ? 'Generating...' : 'Generate Content'}</span>
          </button>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-200 rounded-full mb-4 flex items-center justify-center">
                <Sparkles className="text-purple-600" size={24} />
              </div>
              <p className="text-gray-600">AI is crafting your content...</p>
            </div>
          </div>
        )}

        {/* Generated Content */}
        {generatedContent && !isGenerating && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="text-purple-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">Generated Content</h3>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
                {generatedContent}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContentGeneratorPage;
