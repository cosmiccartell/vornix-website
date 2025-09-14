// src/utils/auth.js
// Defensive getToken utility used across the app.
// Returns a string token or null. Never throws.

export function getToken() {
  try {
    // Common patterns: localStorage, cookie, or a global store.
    if (typeof window === 'undefined') return null;
    // Example: token stored in localStorage under 'token' or 'auth_token'
    const token = window.localStorage.getItem('token') ?? window.localStorage.getItem('auth_token');
    if (!token) return null;
    // Optionally validate shape (very light validation)
    if (typeof token !== 'string' || token.trim() === '') return null;
    return token;
  } catch (err) {
    // If accessing storage throws (rare, e.g. privacy mode), swallow and return null.
    console.error('getToken error (swallowed):', err);
    return null;
  }
}

// Optional helper to clear token
export function clearToken() {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('auth_token');
  } catch (err) {
    console.error('clearToken error (swallowed):', err);
  }
}
