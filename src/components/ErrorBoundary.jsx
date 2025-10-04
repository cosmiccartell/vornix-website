// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  // ... (content remains the same, catches error and renders fallback)
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("Uncaught error in component tree:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1526] to-[#152743] p-8">
          <div className="text-center bg-white/5 p-8 rounded-lg border border-[#9b59b6] border-opacity-50 shadow-xl">
            <h1 className="text-2xl text-[#00d4ff] font-bold mb-3">
              ⚠️ Page Component Failed to Load
            </h1>
            <p className="text-[#9fb4d6] mb-4">
              The 3D Hero on the Home Page is likely causing a runtime crash. Please verify the GLB/PNG files are accessible in your 'public' folder.
            </p>
            <p className="text-sm text-red-400">
              Error: {this.state.error ? this.state.error.message : 'Unknown Error'}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-[#00d4ff] text-[#051923] hover:brightness-95 rounded-md py-2 px-4 font-semibold transition-all"
            >
                Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
