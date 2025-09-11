// This is the full address of your backend server, which we will set in Vercel.
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// This file now correctly uses the full address of your live backend.
export const authApi = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  sendOTP: async (emailData) => {
    const response = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });
    return response.json();
  },

  verifyOTP: async (otpData) => {
    const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(otpData),
    });
    return response.json();
  },
  
  forgotPassword: async (emailData) => {
    const response = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
    });
    return response.json();
  },

  resetPassword: async (token, passwordData) => {
    const response = await fetch(`${API_BASE}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
    });
    return response.json();
  }
};
