// This file will now handle ALL authentication requests correctly.

export const authApi = {
  login: async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  sendOTP: async (emailData) => {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });
    return response.json();
  },

  verifyOTP: async (otpData) => {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(otpData),
    });
    return response.json();
  },
  
  // --- NEW FUNCTION ADDED ---
  forgotPassword: async (emailData) => {
    const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
    });
    return response.json();
  },

  // --- NEW FUNCTION ADDED ---
  resetPassword: async (token, passwordData) => {
    const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
    });
    return response.json();
  }
};
