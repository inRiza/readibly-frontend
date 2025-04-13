'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './footer';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define protected routes
  const protectedRoutes = [
    '/reader',
    '/speech-to-text',
    '/learn',
    '/learn-text',
    '/dashboard',
    '/learn/read',
    '/learn/type',
    '/learn/templates-read',
    '/learn/templates-type'
  ];

  // Define auth routes where navbar and footer should be hidden
  const authRoutes = ['/login', '/signup'];

  // Check if current route is protected
  const isServicePage = protectedRoutes.some(route => pathname?.startsWith(route));
  const isTutorialPage = pathname === '/tutorial';
  const isAuthPage = authRoutes.includes(pathname || '');

  // Add metadata for the page
  useEffect(() => {
    document.title = 'Readibly - Your Reading Companion';
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {!isTutorialPage && !isServicePage && !isAuthPage && <Navbar />}
        <main className={`flex-grow ${!isTutorialPage && !isServicePage && !isAuthPage ? 'pt-16' : ''}`}>
          {children}
        </main>
        {!isTutorialPage && !isServicePage && !isAuthPage && <Footer />}
      </div>
    </AuthProvider>
  );
} 