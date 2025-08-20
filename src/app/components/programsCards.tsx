import Link from "next/link";

export default function VideoCard({ image, title, subtitle }: {image: string, title: string, subtitle: string}) {
  return (
    <Link href={'/program'}>
      <div className="group relative w-[343px] h-[244px] rounded-xl overflow-hidden border border-white/20">
        {/* Imagem */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          />

        {/* Overlay gradient + sombra (só aparece no hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />

        {/* Ícone play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/30 backdrop-blur-md rounded-full p-3">
            {/* <Play className="w-6 h-6 text-white" /> */}
          </div>
        </div>

        {/* Texto embaixo (só aparece no hover) */}
        <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs opacity-80">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
