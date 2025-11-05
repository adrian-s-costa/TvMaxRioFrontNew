"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 z-50 md:hidden">
      <div className="flex justify-around items-center h-16 px-4">
        <Link
          href="/home"
          className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === '/home'
              ? 'text-[#bc0000] scale-110'
              : 'text-gray-400 hover:text-white hover:scale-105'
          }`}
        >
          <div className={`transition-transform duration-300 ${pathname === '/home' ? 'scale-110' : ''}`}>
            <Home size={24} />
          </div>
          <span className={`text-xs font-medium transition-all duration-300 ${
            pathname === '/home' ? 'font-bold' : 'font-medium'
          }`}>
            Home
          </span>
          {pathname === '/home' && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#bc0000] rounded-full animate-pulse"></span>
          )}
        </Link>
        
        <Link
          href="/social"
          className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === '/social'
              ? 'text-[#bc0000] scale-110'
              : 'text-gray-400 hover:text-white hover:scale-105'
          }`}
        >
          <div className={`transition-transform duration-300 ${pathname === '/social' ? 'scale-110' : ''}`}>
            <Users size={24} />
          </div>
          <span className={`text-xs font-medium transition-all duration-300 ${
            pathname === '/social' ? 'font-bold' : 'font-medium'
          }`}>
            Social
          </span>
          {pathname === '/social' && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#bc0000] rounded-full animate-pulse"></span>
          )}
        </Link>
      </div>
    </nav>
  );
}

