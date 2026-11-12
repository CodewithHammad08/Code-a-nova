import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[React ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F7F4] flex items-center justify-center p-6 text-[#20242B]">
          <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-[8px] p-8 shadow-md text-center space-y-5">
            <div className="w-12 h-12 bg-[#C44545]/10 rounded-full flex items-center justify-center mx-auto text-[#C44545]">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-extrabold text-[#17243A] font-display">
                An Unexpected UI Issue Occurred
              </h1>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                The interface encountered a rendering issue. Your session data and submissions remain safely stored in the database.
              </p>
            </div>

            {Boolean(import.meta.env?.DEV) && this.state.error && (
              <div className="p-3 bg-[#F7F7F4] border border-[#E5E7EB] rounded-[5px] text-left overflow-auto max-h-36">
                <p className="font-mono text-[11px] text-[#C44545] font-semibold break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={this.handleReload}
                className="gap-2 font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Application
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={this.handleGoHome}
                className="gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
