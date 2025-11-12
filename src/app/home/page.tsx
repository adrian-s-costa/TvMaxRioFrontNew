"use client"

import Link from 'next/link';
import { urlApi } from '../../../urlApi';
import VideoCardCatalog from '../components/programsCardsCatalog';
import TopNav from '../components/topNav';
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

    const handleFullscreen = () => {
      const iframe = iframeRef.current;

      setTextOpen(false);

      if (!iframe) return;

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    };

  return (
    <>
      <div className=' w-full bg-[#141414] relative font-[Poppins]'>
        <TopNav />

        <div className="w-full relative md:h-[45rem] md:overflow-x-hidden">
          {/* Player em iframe */}
          <iframe
            ref={iframeRef}
            className="md:absolute inset-0 md:w-full md:h-full object-cover"
            src="https://player.logicahost.com.br/player.php?player=1856"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            width={viewportWidth}
            height={(viewportWidth / 16) * 9}
          ></iframe>

          {/* Overlay de gradiente */}
          <div 
            onClick={handleFullscreen} 
            className={`absolute md:flex opacity-0 flex inset-0 bg-gradient-to-b md:h-full h-[57vw] from-[#141414] via-transparent to-[#141414] transition-opacity duration-500 ease-in-out ${
              !textOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          ></div>

          {/* Texto acima do player */}
          

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

        <div className="mt-14 pb-24 md:pb-14 px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">Programas</h1>
          </div>
          
          {tvShows && tvShows.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6 w-full">
              {tvShows.map((tvShow: any) => (
                <VideoCardCatalog
                  key={tvShow.id}
                  image={tvShow.showThumbSrc}
                  title={tvShow.name}
                  subtitle={tvShow.showFrequency}
                  showId={tvShow.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Nenhum programa encontrado</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
