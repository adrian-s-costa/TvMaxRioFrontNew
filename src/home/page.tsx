"use client"

import VideoCard from '../app/components/programsCards'
import { useRef, useState } from "react";

interface FullscreenIframe extends HTMLIFrameElement {
  mozRequestFullScreen?: () => Promise<void> | void;
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
}

export default function Home() {

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

        
        <div className="w-full h-[45rem] relative overflow-hidden">
  {/* Player em iframe */}
  <iframe
    ref={iframeRef}
    className="absolute inset-0 w-full h-full object-cover"
    src="https://player.logicahost.com.br/player.php?player=1856"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
  ></iframe>

  {/* Overlay de gradiente */}
  <div onClick={handleFullscreen} className={`absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414] transition-all duration-500 ease-in-out ${!textOpen ? 'hidden' : '' }`}></div>

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

   <div className={`mt-[100%] max-[mt-[501px]] block md:hidden w-full justify-center h-auto p-5 z-10 backdrop-blur-md `}>
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
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755795981/9cb9afbdaf1462db6c94f787dfca003bcfad04b3_acox5e.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755795980/e03af751d9d990a5390a7780593f6c1ab2c367f8_bletly.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755796009/bb7e487a6c2e70451b1552f9a61bf3544fe92849_o0n5vi.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755795980/9d63e5d720d279c0d719f3a321cfc8db98d00c74_yyy6oq.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
          </div>
        </div>
      </div>
    </>
  )
}
