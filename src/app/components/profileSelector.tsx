"use client"

import { useEffect, useState } from 'react';
import { User, Plus } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  avatar?: string;
}

export default function ProfileSelector({ onSelectProfile }: { onSelectProfile: (profileId: string) => void }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Função para gerar iniciais do nome
  const getInitials = (name: string): string => {
    const trimmedName = name.trim();
    if (!trimmedName) return '';
    
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      // Nome simples: primeira letra
      return words[0].charAt(0).toUpperCase();
    } else {
      // Nome composto: duas primeiras letras de cada nome
      return words
        .slice(0, 2) // Pega os dois primeiros nomes
        .map(word => word.substring(0, 2).toUpperCase())
        .join('');
    }
  };

  useEffect(() => {
    // Carrega perfis do localStorage
    const savedProfiles = localStorage.getItem('tvmax_profiles');
    const savedSelectedProfile = localStorage.getItem('tvmax_selected_profile');
    
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
    
    if (savedSelectedProfile) {
      setSelectedProfileId(savedSelectedProfile);
    }
  }, []);

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) return;

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: newProfileName.trim(),
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('tvmax_profiles', JSON.stringify(updatedProfiles));
    
    setNewProfileName('');
    setIsCreating(false);
    handleSelectProfile(newProfile.id);
  };

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    localStorage.setItem('tvmax_selected_profile', profileId);
    onSelectProfile(profileId);
  };

  const handleDeleteProfile = (profileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedProfiles = profiles.filter(p => p.id !== profileId);
    setProfiles(updatedProfiles);
    localStorage.setItem('tvmax_profiles', JSON.stringify(updatedProfiles));
    
    if (selectedProfileId === profileId) {
      localStorage.removeItem('tvmax_selected_profile');
      setSelectedProfileId(null);
    }
  };

  // Se não há perfis e não está criando, mostra opção de criar
  if (profiles.length === 0 && !isCreating) {
    return (
      <div className="fixed inset-0 bg-[#141414] z-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Quem está assistindo?</h1>
          
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => setIsCreating(true)}
              className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-lg bg-[#1a1a1a] border-2 border-dashed border-gray-600 hover:border-[#bc0000] transition-colors cursor-pointer group"
            >
              <Plus size={48} className="text-gray-400 group-hover:text-[#bc0000] transition-colors" />
              <span className="mt-2 text-sm text-gray-400 group-hover:text-[#bc0000] transition-colors">Criar Perfil</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modo de criação
  if (isCreating) {
    return (
      <div className="fixed inset-0 bg-[#141414] z-50 flex items-center justify-center">
        <div className="text-center px-4 w-full max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Criar Perfil</h1>
          
          <div className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gradient-to-br from-[#bc0000] to-[#8b0000] border-2 border-gray-600 flex items-center justify-center">
              {newProfileName.trim() ? (
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {getInitials(newProfileName)}
                </span>
              ) : (
                <User size={64} className="text-white/50" />
              )}
            </div>
            
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateProfile()}
              placeholder="Nome do perfil"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#bc0000]"
              autoFocus
            />
            
            <div className="flex gap-4 w-full">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewProfileName('');
                }}
                className="flex-1 px-6 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white hover:bg-[#252525] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProfile}
                disabled={!newProfileName.trim()}
                className="flex-1 px-6 py-3 bg-[#bc0000] rounded-lg text-white hover:bg-[#9d0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Seleção de perfis
  return (
    <div className="fixed inset-0 bg-[#141414] z-50 flex items-center justify-center">
      <div className="text-center px-4 w-full max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Quem está assistindo?</h1>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleSelectProfile(profile.id)}
              className="flex flex-col items-center cursor-pointer group relative"
            >
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-lg border-2 flex items-center justify-center transition-all overflow-hidden ${
                selectedProfileId === profile.id
                  ? 'border-[#bc0000] scale-110'
                  : 'border-gray-600 hover:border-[#bc0000]'
              }`}>
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#bc0000] to-[#8b0000]">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      {getInitials(profile.name)}
                    </span>
                  </div>
                )}
              </div>
              <span className={`mt-3 text-sm transition-colors ${
                selectedProfileId === profile.id ? 'text-[#bc0000] font-bold' : 'text-gray-400'
              }`}>
                {profile.name}
              </span>
              {profiles.length > 1 && (
                <button
                  onClick={(e) => handleDeleteProfile(profile.id, e)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#bc0000] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Excluir perfil"
                >
                  <span className="text-white text-xs">×</span>
                </button>
              )}
            </div>
          ))}
          
          <button
            onClick={() => setIsCreating(true)}
            className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-lg bg-[#1a1a1a] border-2 border-dashed border-gray-600 hover:border-[#bc0000] transition-colors cursor-pointer group"
          >
            <Plus size={48} className="text-gray-400 group-hover:text-[#bc0000] transition-colors" />
            <span className="mt-2 text-sm text-gray-400 group-hover:text-[#bc0000] transition-colors">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

