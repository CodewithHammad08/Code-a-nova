import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7F4] text-[#20242B]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#20242B',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          },
          success: {
            iconTheme: {
              primary: '#21845B',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#C44545',
              secondary: '#FFFFFF',
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

