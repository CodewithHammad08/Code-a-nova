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
        <div className="min-h-screen bg-[#080C14] flex items-center justify-center p-6 text-slate-100">
          <div className="max-w-md w-full bg-[#0F172A] border border-white/10 rounded-[10px] p-8 shadow-2xl text-center space-y-5">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-extrabold text-white font-display">
                An Unexpected UI Issue Occurred
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                The interface encountered a rendering issue. Your session data and submissions remain safely stored in the database.
              </p>
            </div>

            {Boolean(import.meta.env?.DEV) && this.state.error && (
              <div className="p-3 bg-[#0B0F19] border border-white/10 rounded-[6px] text-left overflow-auto max-h-36">
                <p className="font-mono text-[11px] text-rose-400 font-semibold break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={this.handleReload}
                className="gap-2 font-bold shadow-[0_0_15px_rgba(56,189,248,0.25)]"
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
