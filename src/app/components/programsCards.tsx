import Link from "next/link";

export default function VideoCard({ image, title, subtitle, showId }: {image: string, title: string, subtitle: string, showId: string}) {
  return (
    <Link href={`/program/${showId}`}>
      <div className="group relative w-[206px] h-[106px] md:w-[343px] md:h-[244px] rounded-xl overflow-hidden border border-white/20 bg-zinc-800">
        {/* Imagem */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          />

        {/* Overlay gradient + sombra (só aparece no hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />

        {/* Ícone play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755795839/play_xnfbn8.svg" alt="" />
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
