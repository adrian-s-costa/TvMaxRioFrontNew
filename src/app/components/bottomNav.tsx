"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Film, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<{ name: string; initials: string } | null>(null);

  useEffect(() => {
    const loadSelectedProfile = () => {
      const savedSelectedProfile = localStorage.getItem('tvmax_selected_profile');
      const savedProfiles = localStorage.getItem('tvmax_profiles');
      
      if (savedSelectedProfile && savedProfiles) {
        const profiles = JSON.parse(savedProfiles);
        const profile = profiles.find((p: any) => p.id === savedSelectedProfile);
        
        if (profile) {
          const words = profile.name.trim().split(/\s+/).filter((word: string) => word.length > 0);
          let initials = '';
          if (words.length === 1) {
            initials = words[0].charAt(0).toUpperCase();
          } else {
            // Nome composto: primeira letra de cada nome (máximo 2 nomes)
            initials = words
              .slice(0, 2)
              .map((word: string) => word.charAt(0).toUpperCase())
              .join('');
          }
          setSelectedProfile({ name: profile.name, initials });
        }
      }
    };

    loadSelectedProfile();
    
    const handleStorageChange = () => {
      loadSelectedProfile();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileChanged', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const checkFullscreen = () => {
      const fullscreenElement = 
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener("fullscreenchange", checkFullscreen);
    document.addEventListener("webkitfullscreenchange", checkFullscreen);
    document.addEventListener("mozfullscreenchange", checkFullscreen);
    document.addEventListener("MSFullscreenChange", checkFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
      document.removeEventListener("webkitfullscreenchange", checkFullscreen);
      document.removeEventListener("mozfullscreenchange", checkFullscreen);
      document.removeEventListener("MSFullscreenChange", checkFullscreen);
    };
  }, []);

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 z-50 md:hidden transition-transform duration-300 ${
      isFullscreen ? 'translate-y-full' : 'translate-y-0'
    }`}>
      <div className="flex justify-around items-center h-16 px-1">
        <Link
          href="/home"
          className={`relative flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === '/home'
              ? 'text-[#bc0000] scale-110'
              : 'text-gray-400 hover:text-white hover:scale-105'
          }`}
        >
          <div className={`transition-transform duration-300 ${pathname === '/home' ? 'scale-110' : ''}`}>
            <Home size={20} />
          </div>
          <span className={`text-[10px] font-medium transition-all duration-300 ${
            pathname === '/home' ? 'font-bold' : 'font-medium'
          }`}>
            Home
          </span>
          {pathname === '/home' && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#bc0000] rounded-full animate-pulse"></span>
          )}
        </Link>

        <Link
          href="/programs"
          className={`relative flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === '/programs'
              ? 'text-[#bc0000] scale-110'
              : 'text-gray-400 hover:text-white hover:scale-105'
          }`}
        >
          <div className={`transition-transform duration-300 ${pathname === '/programs' ? 'scale-110' : ''}`}>
            <Film size={20} />
          </div>
          <span className={`text-[10px] font-medium transition-all duration-300 ${
            pathname === '/programs' ? 'font-bold' : 'font-medium'
          }`}>
            Programas
          </span>
          {pathname === '/programs' && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#bc0000] rounded-full animate-pulse"></span>
          )}
        </Link>
        
        <Link
          href="/social"
          className={`relative flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === '/social'
              ? 'text-[#bc0000] scale-110'
              : 'text-gray-400 hover:text-white hover:scale-105'
          }`}
        >
          <div className={`transition-transform duration-300 ${pathname === '/social' ? 'scale-110' : ''}`}>
            <Users size={20} />
          </div>
          <span className={`text-[10px] font-medium transition-all duration-300 ${
            pathname === '/social' ? 'font-bold' : 'font-medium'
          }`}>
            Social
          </span>
          {pathname === '/social' && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#bc0000] rounded-full animate-pulse"></span>
          )}
        </Link>

        <Link
          href="/profile"
          className={`relative flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === '/profile'
              ? 'text-[#bc0000] scale-110'
              : 'text-gray-400 hover:text-white hover:scale-105'
          }`}
        >
          <div className={`transition-transform duration-300 ${pathname === '/profile' ? 'scale-110' : ''}`}>
            {selectedProfile ? (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#bc0000] to-[#8b0000] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{selectedProfile.initials}</span>
              </div>
            ) : (
              <User size={20} />
            )}
          </div>
          <span className={`text-[10px] font-medium transition-all duration-300 ${
            pathname === '/profile' ? 'font-bold' : 'font-medium'
          }`}>
            Perfil
          </span>
          {pathname === '/profile' && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#bc0000] rounded-full animate-pulse"></span>
          )}
        </Link>
      </div>
    </nav>
  );
}

