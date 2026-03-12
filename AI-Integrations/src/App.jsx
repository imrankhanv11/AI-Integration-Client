import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import DocumentAnalyzerPage from './pages/DocumentAnalyzerPage';
import ContentGeneratorPage from './pages/ContentGeneratorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/document" element={<DocumentAnalyzerPage />} />
        <Route path="/content" element={<ContentGeneratorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
