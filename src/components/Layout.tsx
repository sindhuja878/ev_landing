import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';
import { CustomCursor } from './CustomCursor';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen selection:bg-brand-gold-end selection:text-white relative bg-brand-dark-sky text-white cursor-none">
      <CustomCursor />
      <div className="noise" />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};
