"use client"

import Link from 'next/link';
import { urlApi } from '../../../urlApi';
import VideoCard from '../components/programsCards'
import TopNav from '../components/topNav';
import Carousel from '../components/carousel';
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FullscreenIframe extends HTMLIFrameElement {
  mozRequestFullScreen?: () => Promise<void> | void;
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
}

export default function Home() {
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [tvShows, setTvShows] = useState([]);
  const [isIOS, setIsIOS] = useState(false);

  const notify = (text: string) => toast.error(text , {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  
  async function getTvShows() {
    const res = await fetch(urlApi.API_URL + `/tvmax`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420"
      },
    })
    
    if (!res.ok) {
      notify(res.statusText)
      throw new Error('Failed to log in');
    }

    return setTvShows(await res.json())        
  }

  useEffect(() => {
    getTvShows();

    // Detecta se está em iOS (incluindo webview)
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isWebView = (window as any).webkit?.messageHandlers || (window as any).ReactNativeWebView;
    setIsIOS(isIOSDevice || isWebView);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    setViewportWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [textOpen, setTextOpen] = useState(true);

    const iframeRef = useRef<FullscreenIframe | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleFullscreen = async () => {
      const iframe = iframeRef.current;
      const container = containerRef.current;

      if (!iframe || !container) return;

      try {
        // Para iOS, tenta entrar em fullscreen com o container (wrapper do iframe)
        if (isIOS) {
          // Cria um elemento wrapper para fullscreen no iOS
          const wrapper = container.parentElement;
          if (wrapper) {
            if ((wrapper as any).webkitEnterFullscreen) {
              (wrapper as any).webkitEnterFullscreen();
              return;
            }
            
            // Tenta fullscreen no container
            if ((wrapper as any).webkitRequestFullscreen) {
              await (wrapper as any).webkitRequestFullscreen();
              return;
            }
          }
        }

        // Para outros navegadores, tenta fullscreen no iframe primeiro
        if (iframe.requestFullscreen) {
          await iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          await iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          await iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
          await iframe.msRequestFullscreen();
        } else {
          // Fallback: tenta fullscreen no container
          if (container.requestFullscreen) {
            await container.requestFullscreen();
          } else if ((container as any).webkitRequestFullscreen) {
            await (container as any).webkitRequestFullscreen();
          }
        }
      } catch (error) {
        console.error('Erro ao entrar em fullscreen:', error);
        // Em caso de erro, tenta fazer o container ocupar toda a tela
        if (container) {
          container.style.position = 'fixed';
          container.style.top = '0';
          container.style.left = '0';
          container.style.width = '100vw';
          container.style.height = '100vh';
          container.style.zIndex = '9999';
        }
      }
    };

  return (
    <>
      <div className=' w-full bg-[#141414] relative font-[Poppins]'>
        <TopNav />

        <div 
          ref={containerRef}
          className="w-full relative md:h-[45rem] md:overflow-x-hidden"
        >
          {/* Player em iframe */}
          <iframe
            ref={iframeRef}
            className="md:absolute inset-0 md:w-full md:h-full object-cover w-full"
            src="https://player.logicahost.com.br/player.php?player=1856"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            width={viewportWidth || '100%'}
            height={viewportWidth ? (viewportWidth / 16) * 9 : 'auto'}
            style={{
              minHeight: viewportWidth ? `${(viewportWidth / 16) * 9}px` : '56.25vw'
            }}
          ></iframe>

          {/* Overlay de gradiente */}
          <div 
            onClick={handleFullscreen} 
            className={`absolute md:flex flex inset-0 bg-gradient-to-b md:h-full h-[57vw] from-[#141414] via-transparent to-[#141414] transition-opacity duration-500 ease-in-out ${
              !textOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          ></div>

          {/* Texto acima do player */}
          <div 
            className={`hidden md:block absolute top-[350px] left-[128px] w-[592px] h-auto p-5 mb-[19px] z-20 bg-white/30 backdrop-blur-md rounded-lg transition-all duration-500 ease-in-out ${
              !textOpen 
                ? 'opacity-0 translate-y-[-20px] scale-95 pointer-events-none' 
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setTextOpen(false);
              }} 
              className="absolute cursor-pointer -right-[10px] -top-[10px] rounded-full w-[40px] h-[40px] flex justify-center items-center bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all duration-200 hover:scale-110 z-30"
              aria-label="Fechar"
            >
              <span className="text-[25px] font-semibold text-white leading-none">×</span>
            </button>
            <h1 className="text-[58px] text-[#bc0000] italic">TV AO VIVO</h1>
            <h2 className="text-[18px] text-[#ffffff]">
              Bem-vindo ao TV MAX Rio! Nosso canal é dedicado a levar até você o melhor
              conteúdo sobre a cidade maravilhosa e seu incrível estilo de vida. Aqui você
              encontra notícias locais, cultura, turismo, esportes, eventos e muito mais,
              tudo com uma pegada dinâmica e atualizada.
            </h2>
          </div>

          <div className={`md:mt-[100%] mt-[${viewportWidth + 'px'}] block md:hidden w-full justify-center h-auto p-5 z-10 backdrop-blur-md `}>
            <h1 className="text-[28px] text-[#bc0000] italic w-full flex justify-center">TV AO VIVO</h1>
            <h2 className="text-[14px] text-center text-[#ffffff] w-full flex justify-center">
              Bem-vindo ao TV MAX Rio! Nosso canal é dedicado a levar até você o melhor
              conteúdo sobre a cidade maravilhosa e seu incrível estilo de vida. Aqui você
              encontra notícias locais, cultura, turismo, esportes, eventos e muito mais,
              tudo com uma pegada dinâmica e atualizada.
            </h2>
          </div> 
        </div>

        <div className="mt-14 pb-24 md:pb-14 mx-10">
          <Carousel title="Programas">
            {tvShows && tvShows
              .map((tvShow: any, index: number) => {
                return <VideoCard
                  image={tvShow.showThumbSrc}
                  title={tvShow.name}
                  subtitle={tvShow.showFrequency} 
                  showId={tvShow.id}
                  key={tvShow.id}          
                />
              })}
          </Carousel>
        </div>
      </div>
    </>
  )
}
