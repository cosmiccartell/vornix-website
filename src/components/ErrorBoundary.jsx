// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also send error + info to your logging service here
    console.error('ErrorBoundary caught:', error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a1526] text-white p-6">
          <div className="max-w-xl text-center bg-[#0f1d34] rounded-2xl p-8 border border-gray-700">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h1>
            <p className="mb-4">An unexpected error occurred. Please try refreshing the page.</p>
            <details className="text-left text-sm text-gray-300">
              <summary className="cursor-pointer">Technical details (for debugging)</summary>
              <pre className="whitespace-pre-wrap mt-2 text-xs">{String(this.state.error)}</pre>
              {this.state.info && <pre className="whitespace-pre-wrap mt-2 text-xs">{JSON.stringify(this.state.info, null, 2)}</pre>}
            </details>
            <div className="mt-6 flex justify-center gap-4">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg">Reload</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
