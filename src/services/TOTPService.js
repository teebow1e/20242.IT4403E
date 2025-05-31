import { auth } from '../firebase';

const API_BASE_URL = 'https://backend-coffee.trungtqt.com';

class TOTPServiceAPI {
  async getAuthHeaders() {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const idToken = await user.getIdToken();
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      };
    } catch (error) {
      console.error('Error getting auth headers:', error);
      throw new Error('Authentication failed');
    }
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const headers = await this.getAuthHeaders();

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers,
        ...options
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);

      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }

      if (error.message.includes('401')) {
        throw new Error('Authentication failed. Please sign in again.');
      }

      throw error;
    }
  }

  async setupTOTP(userId, userEmail) {
    try {
      const response = await this.makeRequest('/api/totp/setup', {
        method: 'POST'
      });

      return {
        success: true,
        qrCodeUrl: response.qrCodeUrl,
        manualEntryKey: response.manualEntryKey
      };
    } catch (error) {
      console.error('Error setting up TOTP:', error);
      return {
        success: false,
        message: error.message || 'Failed to setup authenticator'
      };
    }
  }

  async verifyTOTPSetup(userId, token) {
    try {
      const response = await this.makeRequest('/api/totp/verify-setup', {
        method: 'POST',
        body: JSON.stringify({ token })
      });

      return {
        success: true,
        message: response.message,
        backupCodes: response.backupCodes
      };
    } catch (error) {
      console.error('Error verifying TOTP setup:', error);
      return {
        success: false,
        message: error.message || 'Verification failed'
      };
    }
  }

  async verifyTOTP(userId, token) {
    try {
      const response = await this.makeRequest('/api/totp/verify', {
        method: 'POST',
        body: JSON.stringify({ token })
      });

      return {
        success: true,
        message: response.message
      };
    } catch (error) {
      console.error('Error verifying TOTP:', error);
      return {
        success: false,
        message: error.message || 'Verification failed'
      };
    }
  }

  async isTOTPEnabled(userId) {
    try {
      const response = await this.makeRequest('/api/totp/status');
      return response.enabled || false;
    } catch (error) {
      console.error('Error checking TOTP status:', error);
      return false;
    }
  }

  async disableTOTP(userId) {
    try {
      const response = await this.makeRequest('/api/totp/disable', {
        method: 'DELETE'
      });

      return {
        success: true,
        message: response.message
      };
    } catch (error) {
      console.error('Error disabling TOTP:', error);
      return {
        success: false,
        message: error.message || 'Failed to disable TOTP'
      };
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }

  async safeRequest(operation, fallbackResult = { success: false, message: 'Service unavailable' }) {
    try {
      const isHealthy = await this.checkHealth();
      if (!isHealthy) {
        throw new Error('Backend service is unavailable');
      }

      return await operation();
    } catch (error) {
      console.error('Safe request failed:', error);
      return {
        ...fallbackResult,
        message: error.message || fallbackResult.message
      };
    }
  }

  async retryOperation(operation, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }

        console.warn(`Operation failed (attempt ${attempt}/${maxRetries}):`, error.message);
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
}

export const TOTPService = new TOTPServiceAPI();
export default TOTPService;
