// API Base Configuration and Service Layer
const API_BASE_URL = 'https://orbit-backend-muuo.onrender.com';

class ApiService {
  private baseURL: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadTokens();
  }

  private loadTokens() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  private saveTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authToken'); // Legacy token
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/api/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.saveTokens(data.access_token, data.refresh_token || this.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    this.clearTokens();
    return false;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth: boolean = true
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (requiresAuth && this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      let response = await fetch(url, {
        ...options,
        headers,
      });

      // If unauthorized, try to refresh token
      if (response.status === 401 && requiresAuth && this.refreshToken) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
          response = await fetch(url, {
            ...options,
            headers,
          });
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication
  async login(username: string, password: string) {
    const response = await this.makeRequest<{
      access_token: string;
      refresh_token: string;
      user: any;
    }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }, false);

    this.saveTokens(response.access_token, response.refresh_token);
    return response;
  }

  async logout() {
    try {
      await this.makeRequest('/api/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  // Assistants
  async getAssistants() {
    return this.makeRequest('/api/assistants');
  }

  async createAssistant(assistantData: any) {
    return this.makeRequest('/api/assistants', {
      method: 'POST',
      body: JSON.stringify(assistantData),
    });
  }

  async updateAssistant(id: string, assistantData: any) {
    return this.makeRequest(`/api/assistants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assistantData),
    });
  }

  async deleteAssistant(id: string) {
    return this.makeRequest(`/api/assistants/${id}`, { method: 'DELETE' });
  }

  // Calls
  async getCalls() {
    return this.makeRequest('/api/calls');
  }

  async getAssistantCalls(assistantId: string) {
    return this.makeRequest(`/api/assistants/${assistantId}/calls`);
  }

  // Phone Numbers
  async getPhoneNumbers() {
    return this.makeRequest('/api/phone_numbers');
  }

  // Files
  async uploadFile(file: File, metadata?: any) {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const headers: HeadersInit = {};
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${this.baseURL}/api/files/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getFiles() {
    return this.makeRequest('/api/files');
  }

  async deleteFile(fileId: string) {
    return this.makeRequest(`/api/files/${fileId}`, { method: 'DELETE' });
  }

  // Analytics
  async getCallAnalytics() {
    return this.makeRequest('/api/analytics/calls/statuses');
  }

  async getRecentCallAnalytics() {
    return this.makeRequest('/api/analytics/calls/recent');
  }

  // Conversations
  async getConversations() {
    return this.makeRequest('/api/conversations');
  }

  async getConversationMessages(conversationId: string) {
    return this.makeRequest(`/api/conversations/${conversationId}/messages`);
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;