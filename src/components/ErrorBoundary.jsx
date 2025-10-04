import React from 'react';

/**
 * A basic React Error Boundary class component.
 * It catches JavaScript errors in the component tree below it and renders a fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track if an error has occurred
    this.state = { hasError: false, error: null };
  }

  // Lifecycle method called when an error is thrown
  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  // Lifecycle method to log error information
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
    // Optionally log to an external service here
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI to prevent blank screen
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1526] to-[#152743] p-8">
          <div className="text-center bg-white/5 p-8 rounded-lg border border-[#9b59b6] border-opacity-50 shadow-xl">
            <h1 className="text-2xl text-[#00d4ff] font-bold mb-3">
              ⚠️ Content Loading Failed
            </h1>
            <p className="text-[#9fb4d6] mb-4">
              A critical component (likely the 3D hero) crashed. This usually means the model files are missing or a dependency failed.
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
