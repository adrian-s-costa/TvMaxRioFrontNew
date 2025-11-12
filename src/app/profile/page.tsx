"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '../components/topNav';
import { User, Plus, Trash2, Edit2, MoreVertical } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Profile {
  id: string;
  name: string;
  avatar?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newProfileName, setNewProfileName] = useState('');
  const [editingName, setEditingName] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const savedProfiles = localStorage.getItem('tvmax_profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }

    // Fecha o menu ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu-button') && !target.closest('.profile-actions-overlay')) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) {
      toast.error('Digite um nome para o perfil');
      return;
    }

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: newProfileName.trim(),
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('tvmax_profiles', JSON.stringify(updatedProfiles));
    
    setNewProfileName('');
    setIsCreating(false);
    toast.success('Perfil criado com sucesso!');
  };

  const handleEditProfile = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setEditingName(profile.name);
      setIsEditing(profileId);
    }
  };

  const handleSaveEdit = (profileId: string) => {
    if (!editingName.trim()) {
      toast.error('Digite um nome para o perfil');
      return;
    }

    const updatedProfiles = profiles.map(p => 
      p.id === profileId ? { ...p, name: editingName.trim() } : p
    );
    setProfiles(updatedProfiles);
    localStorage.setItem('tvmax_profiles', JSON.stringify(updatedProfiles));
    
    // Se o perfil editado é o selecionado, atualiza o BottomNav
    const selectedProfile = localStorage.getItem('tvmax_selected_profile');
    if (selectedProfile === profileId) {
      window.dispatchEvent(new Event('profileChanged'));
    }
    
    setIsEditing(null);
    setEditingName('');
    toast.success('Perfil atualizado!');
  };

  const handleDeleteProfile = (profileId: string) => {
    if (profiles.length <= 1) {
      toast.error('Você precisa ter pelo menos um perfil');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      const updatedProfiles = profiles.filter(p => p.id !== profileId);
      setProfiles(updatedProfiles);
      localStorage.setItem('tvmax_profiles', JSON.stringify(updatedProfiles));
      
      const selectedProfile = localStorage.getItem('tvmax_selected_profile');
      if (selectedProfile === profileId) {
        localStorage.removeItem('tvmax_selected_profile');
      }
      
      toast.success('Perfil excluído!');
    }
  };

  const handleSelectProfile = (profileId: string) => {
    localStorage.setItem('tvmax_selected_profile', profileId);
    // Dispara evento para atualizar o BottomNav
    window.dispatchEvent(new Event('profileChanged'));
    toast.success('Perfil selecionado!');
    router.push('/home');
  };

  const handleSwitchProfile = () => {
    localStorage.removeItem('tvmax_selected_profile');
    window.location.href = '/home';
  };

  // Função para gerar iniciais do nome
  const getInitials = (name: string): string => {
    const trimmedName = name.trim();
    if (!trimmedName) return '';
    
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      // Nome simples: primeira letra
      return words[0].charAt(0).toUpperCase();
    } else {
      // Nome composto: primeira letra de cada nome (máximo 2 nomes)
      return words
        .slice(0, 2) // Pega os dois primeiros nomes
        .map(word => word.charAt(0).toUpperCase())
        .join('');
    }
  };

  return (
    <>
    <TopNav />
    <div className="min-h-screen bg-[#141414] text-white font-[Poppins] pb-24 md:pb-14 pt-20 md:pt-32">
      
      <div className="px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">Gerenciar Perfis</h1>
                <p className="text-gray-400 text-sm md:text-base">Crie e gerencie seus perfis de visualização</p>
              </div>
              <button
                onClick={handleSwitchProfile}
                className="px-4 py-2 bg-[#bc0000] rounded-lg text-white hover:bg-[#9d0000] transition-colors text-sm md:text-base"
              >
                Trocar Perfil
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col items-center group relative"
              >
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg bg-[#1a1a1a] border-2 border-gray-600 flex items-center justify-center relative overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#bc0000] to-[#8b0000]">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {getInitials(profile.name)}
                      </span>
                    </div>
                  )}
                  
                  {/* Botão de 3 pontos no mobile */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === profile.id ? null : profile.id);
                    }}
                    className="profile-menu-button md:hidden absolute top-2 right-2 p-1.5 bg-black/70 rounded-full hover:bg-black/90 active:bg-black/90 transition-colors z-10"
                  >
                    <MoreVertical size={18} className="text-white" />
                  </button>
                  
                  {/* Botões de ação - aparecem no hover (desktop) ou ao clicar nos 3 pontos (mobile) */}
                  <div className={`profile-actions-overlay absolute inset-0 bg-black/70 flex items-center justify-center gap-2 transition-opacity ${
                    openMenuId === profile.id
                      ? 'opacity-100 md:opacity-0'
                      : 'opacity-0'
                  } md:group-hover:opacity-100`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProfile(profile.id);
                        setOpenMenuId(null);
                      }}
                      className="p-2 bg-[#bc0000] rounded-full hover:bg-[#9d0000] active:bg-[#9d0000] transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={20} className="text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProfile(profile.id);
                        setOpenMenuId(null);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        profiles.length > 1
                          ? 'bg-red-600 hover:bg-red-700 active:bg-red-700'
                          : 'bg-gray-600 opacity-50 cursor-not-allowed'
                      }`}
                      title={profiles.length > 1 ? "Excluir" : "Você precisa ter pelo menos um perfil"}
                      disabled={profiles.length <= 1}
                    >
                      <Trash2 size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                
                {isEditing === profile.id ? (
                  <div className="mt-3 flex flex-col gap-2 items-center w-full">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(profile.id)}
                      className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white text-base w-full max-w-[140px] focus:outline-none focus:border-[#bc0000] text-center"
                      style={{ fontSize: '16px' }}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(profile.id)}
                        className="px-4 py-1 bg-[#bc0000] rounded text-sm hover:bg-[#9d0000] transition-colors"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          setEditingName('');
                        }}
                        className="px-4 py-1 bg-gray-600 rounded text-sm hover:bg-gray-700 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="mt-3 text-sm md:text-base text-gray-300 text-center max-w-[140px] truncate">{profile.name}</span>
                )}
              </div>
            ))}
            
            {!isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                className="flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-lg bg-[#1a1a1a] border-2 border-dashed border-gray-600 hover:border-[#bc0000] transition-colors cursor-pointer group"
              >
                <Plus size={40} className="text-gray-400 group-hover:text-[#bc0000] transition-colors md:w-12 md:h-12" />
                <span className="mt-2 text-xs md:text-sm text-gray-400 group-hover:text-[#bc0000] transition-colors text-center px-2">Adicionar</span>
              </button>
            )}
          </div>

          {isCreating && (
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-600 max-w-md mx-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Criar Novo Perfil</h2>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gradient-to-br from-[#bc0000] to-[#8b0000] border-2 border-gray-600 flex items-center justify-center">
                  {newProfileName.trim() ? (
                    <span className="text-4xl md:text-5xl font-bold text-white">
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
                  className="w-full px-4 py-3 bg-[#141414] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#bc0000]"
                  style={{ fontSize: '16px' }}
                  autoFocus
                />
                
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewProfileName('');
                    }}
                    className="flex-1 px-6 py-3 bg-[#141414] border border-gray-600 rounded-lg text-white hover:bg-[#252525] transition-colors"
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
          )}
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
    </>
  );
}

