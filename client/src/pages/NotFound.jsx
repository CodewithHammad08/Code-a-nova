import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="text-5xl font-extrabold text-[#17243A] font-mono">404</div>
        <h1 className="text-xl font-bold text-[#17243A]">Page Not Found</h1>
        <p className="text-xs text-[#6B7280]">
          The resource or page you are attempting to access does not exist or has been relocated.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="sm" className="gap-2">
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
