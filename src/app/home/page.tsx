"use client"

import Link from 'next/link';
import { urlApi } from '../../../urlApi';
import VideoCard from '../components/programsCards'
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
        <div className='w-full flex justify-between pt-[20px] z-10 absolute'>
          <img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755655466/09fa9195634d318711940d331b600d897d2a8187_1_bh67vv.png" width={60} height={110} alt="logo" className='text-white ml-[100px] md:block hidden ' />
          <img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755655466/09fa9195634d318711940d331b600d897d2a8187_1_bh67vv.png" width={40} height={90} alt="logo" className='text-white ml-[20px] block md:hidden' />
          
          <div>
            <ul className='hidden md:flex text-white h-full items-center gap-[30px] mr-[40px] w-full'>
              <li className='cursor-pointer w-auto'>Ao Vivo</li>
              <li className='cursor-pointer w-auto'>Programas</li>
              <li className='cursor-pointer w-auto'>Contato</li>
              <li className='cursor-pointer w-auto'>Programações</li>
            </ul>
          </div>
        </div>

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
          <div onClick={handleFullscreen} className={`absolute md:flex flex inset-0 bg-gradient-to-b md:h-full h-[57vw] from-[#141414] via-transparent to-[#141414] transition-all duration-500 ease-in-out ${!textOpen ? 'hidden' : '' }`}></div>

          {/* Texto acima do player */}
          <div className={`hidden md:block absolute top-[350px] left-[128px] w-[592px] h-auto p-5 mb-[19px] z-10 bg-white/30 backdrop-blur-md bg-backdrop-blur-md rounded-lg transition-all duration-500 ease-in-out ${!textOpen ? 'hidden' : '' }`}>
            <div onClick={()=>{ setTextOpen(false) }} className="absolute cursor-pointer right-[-10] top-[-10] rounded-full w-[40px] h-[40px] flex justify-center items-center bg-white/30 backdrop-blur-md">
              <h1 className="text-[25px] font-semibold text-white">X</h1>
            </div>
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

        <div>
          <h1 className='md:text-[48px] text-[24px] mt-14 mb-[16px] text-white font-bold ml-10'>
            Programas
          </h1>
          <div className='flex mx-10 justify-between gap-2 pb-24 overflow-x-scroll'>

            {tvShows && tvShows
              // .filter((carro: any) => carro.uf.includes(uf))
              .map((tvShow: any, index: number) => {
                return <VideoCard
                  image={tvShow.showThumbSrc}
                  title={tvShow.name}
                  subtitle={tvShow.showFrequency} 
                  showId={tvShow.id}
                  key={tvShow.id}          
                />
              })}
          </div>
        </div>
      </div>
    </>
  )
}
