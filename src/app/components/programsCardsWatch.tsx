import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function VideoCardWatch({ image, title, subtitle, showSrc }: {image: string, title: string, subtitle: string, showSrc: string}) {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).mozRequestFullScreen) {
      (video as any).mozRequestFullScreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };

    useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange); // Safari
    document.addEventListener("mozfullscreenchange", onChange); // Firefox
    document.addEventListener("MSFullscreenChange", onChange); // IE/Edge antigo

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
      document.removeEventListener("mozfullscreenchange", onChange);
      document.removeEventListener("MSFullscreenChange", onChange);
    };
  }, []);

  useEffect(()=>{
    !isFullscreen ? videoRef.current?.pause() : null
  }, [isFullscreen])


  return (
    <>
      <video
        ref={videoRef}
        controls
        src={showSrc}
        className={isFullscreen ? `flex` : `hidden` }
        onClick={handleFullscreen}
      />
      <div
        onClick={handleFullscreen}
        className="relative w-[206px] h-[106px] md:w-[343px] md:h-[244px] rounded-xl overflow-hidden border border-white/20 bg-zinc-800 flex-shrink-0 cursor-pointer">
        {/* Imagem */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          />

        {/* Overlay gradient + sombra (sempre visível) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Ícone play (sempre visível) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755795839/play_xnfbn8.svg" alt="" />
        </div>

        {/* Texto embaixo (sempre visível) */}
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs opacity-80">{subtitle}</p>
        </div>
      </div>
    </>
  );
}
