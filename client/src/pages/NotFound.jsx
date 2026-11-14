import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 text-center text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-md space-y-4">
        <Link to="/" className="inline-block group">
          <img
            src="/logo.png"
            alt="Code-a-Nova Logo"
            className="w-16 h-16 rounded-2xl object-contain mx-auto border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
          />
        </Link>
        <div className="text-6xl font-extrabold text-slate-900 font-mono tracking-wider">404</div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">Page Not Found</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The resource or page you are attempting to access does not exist or has been relocated within the platform.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" className="gap-2 font-bold shadow-xs">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
