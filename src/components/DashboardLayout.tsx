'use client';

import { useState, useEffect } from 'react';
import { Menu, ChevronLeft, BookOpen, Headphones, Brain, LogOut, ChevronRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DesktopOnly from './DesktopOnly';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarState');
      return savedState ? JSON.parse(savedState) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarState', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <DesktopOnly>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
        >
          {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg transform ${
            isSidebarOpen ? 'w-64' : 'w-20'
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className={`text-2xl font-bold text-[#2e31ce] ${!isSidebarOpen && 'md:hidden'}`}>Readibly</h1>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className={`p-2 rounded-lg ${!isSidebarOpen && 'md:hidden'}`}
              >
                <ChevronLeft className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>

            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="absolute right-0 left-0 pl-6 p-1 rounded-md hidden md:block"
              >
                <ChevronRight className="h-7 w-7 text-muted-foreground" />
              </button>
            )}

            <nav className="top-4 flex-1 space-y-2 mt-8">
              <Link
                href="/dashboard"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-purple-50 text-[#2e31ce]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className={`${isSidebarOpen ? 'h-6 w-6' : 'h-7 w-7'}`} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Dashboard</span>
              </Link>

              <Link
                href="/reader"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive('/reader')
                    ? 'bg-purple-50 text-[#2e31ce]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BookOpen className={`${isSidebarOpen ? 'h-6 w-6' : 'h-7 w-7'}`} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>PDF Reader</span>
              </Link>

              <Link
                href="/speech-to-text"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive('/speech-to-text')
                    ? 'bg-purple-50 text-[#2e31ce]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Headphones className={`${isSidebarOpen ? 'h-6 w-6' : 'h-7 w-7'}`} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Speech to Text</span>
              </Link>

              <Link
                href="/learn"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive('/learn')
                    ? 'bg-purple-50 text-[#2e31ce]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Brain className={`${isSidebarOpen ? 'h-6 w-6' : 'h-7 w-7'}`} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Learning Center</span>
              </Link>
            </nav>

            <div className={`pt-4 border-t border-gray-200 ${!isSidebarOpen && 'md:hidden'}`}>
              <button
                className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50 w-full transition-colors`}
                onClick={handleLogout}
              >
                <LogOut className={`${isSidebarOpen ? 'h-6 w-6' : 'h-7 w-7'}`} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="p-6">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </DesktopOnly>
  );
} 