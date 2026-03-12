import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { chatService } from '../services/chatService';

export const useChat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  // Initialize: load conversations list
  useEffect(() => {
    const fetchConversations = async () => {
      const result = await chatService.getAllConversations();
      if (result.success && result.data) {
        setConversations(result.data);
      }
    };
    fetchConversations();
  }, []);

  const createNewChat = useCallback(async () => {
    const result = await chatService.createConversation();
    if (result.success && result.data) {
      setActiveConversationId(result.data.id);
      setMessages([]); // Clear active messages pane
      setConversations(prev => [result.data, ...prev]);
      setError(null);
    } else {
      setError("Failed to create new conversation: " + result.error);
    }
  }, []);

  const switchConversation = useCallback(async (conversationId) => {
    setActiveConversationId(conversationId);
    setError(null);
    
    // Fetch History
    const result = await chatService.getHistory(conversationId);
    if (result.success && result.data) {
        setMessages(result.data.messages || []);
    } else {
        setMessages([]);
        setError("Failed to load conversation history.");
    }
  }, []);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    let targetConvId = activeConversationId;
    
    // If no active conversation, create one first
    if (!targetConvId) {
        const createResult = await chatService.createConversation();
        if (createResult.success && createResult.data) {
            targetConvId = createResult.data.id;
            setActiveConversationId(targetConvId);
            setConversations(prev => [createResult.data, ...prev]);
        } else {
            setError("Cannot create conversation to send message.");
            return;
        }
    }

    // Speculatively add user message to UI
    const newUserMsg = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);
    setError(null);

    // Call API
    const result = await chatService.sendMessage(targetConvId, content.trim());
    setIsTyping(false);

    if (result.success && result.data) {
        setMessages(prev => [...prev, result.data]);
        
        // Refresh conversations list to get updated titles/timestamps
        const refreshResult = await chatService.getAllConversations();
        if (refreshResult.success && refreshResult.data) {
             setConversations(refreshResult.data);
        }
    } else {
        setError(result.error || "Failed to send message");
    }
  }, [activeConversationId]);

  return {
    conversations,
    activeConversationId,
    messages,
    isTyping,
    error,
    sendMessage,
    createNewChat,
    switchConversation
  };
};
