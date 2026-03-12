const API_BASE_URL = 'http://localhost:5247/api/chat'; // Assuming ASP.NET runs on 5247

export const chatService = {
  async sendMessage(conversationId, message) {
    try {
      const response = await fetch(`${API_BASE_URL}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationId, message }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      return { success: false, error: 'Network error occurred while sending message.' };
    }
  },

  async createConversation() {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating conversation:", error);
      return { success: false, error: 'Network error occurred while creating a new conversation.' };
    }
  },

  async getHistory(conversationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching history:", error);
      return { success: false, error: 'Network error occurred fetching history.' };
    }
  },

  async getAllConversations() {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching all conversations:", error);
      return { success: false, error: 'Network error occurred fetching conversations.' };
    }
  }
};
