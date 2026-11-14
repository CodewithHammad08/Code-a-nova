import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#080C14] text-slate-100 selection:bg-cyan-500/25 selection:text-cyan-200">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0F172A',
            color: '#F8FAFC',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontSize: '13px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#0F172A',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#0F172A',
            },
          },
        }}
      />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
