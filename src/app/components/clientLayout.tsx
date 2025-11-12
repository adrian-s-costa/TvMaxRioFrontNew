"use client"

import { useEffect, useState } from 'react';
import BottomNav from './bottomNav';
import PageTransition from './pageTransition';
import ProfileSelector from './profileSelector';
import Loader from './loader';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [hasSelectedProfile, setHasSelectedProfile] = useState(false);

  useEffect(() => {
    // Simula loading inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Verifica se há perfil selecionado
      const selectedProfile = localStorage.getItem('tvmax_selected_profile');
      const profiles = localStorage.getItem('tvmax_profiles');
      
      if (!selectedProfile || !profiles) {
        setShowProfileSelector(true);
      } else {
        setHasSelectedProfile(true);
      }
    }, 1500); // 1.5 segundos de loading

    return () => clearTimeout(timer);
  }, []);

  const handleSelectProfile = (profileId: string) => {
    setHasSelectedProfile(true);
    setShowProfileSelector(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (showProfileSelector && !hasSelectedProfile) {
    return <ProfileSelector onSelectProfile={handleSelectProfile} />;
  }

  return (
    <>
      <PageTransition>
        {children}
      </PageTransition>
      <BottomNav />
    </>
  );
}

