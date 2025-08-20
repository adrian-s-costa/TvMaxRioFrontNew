import Image from "next/image";
import VideoCard from './components/programsCards'
import LaptopsCard from './components/ondeEstamosCard'
import PlanosCard from './components/planosCard'

export default function Home() {
  return (
    <>
      <div className='h-full w-full bg-[#141414] relative font-[Poppins]'>
        <div className='w-full flex justify-between pt-[20px] z-10 absolute'>
          <img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755655466/09fa9195634d318711940d331b600d897d2a8187_1_bh67vv.png" width={60} height={110} alt="logo" className='text-white ml-[100px]' />

          <div>
            <ul className='flex text-white h-full items-center gap-[30px] mr-[40px] w-full'>
              <li className='cursor-pointer w-auto'>Ao Vivo</li>
              <li className='cursor-pointer w-auto'>Programas</li>
              <li className='cursor-pointer w-auto'>Contato</li>
              <li className='cursor-pointer w-auto'>Programações</li>
            </ul>
          </div>
        </div>

        
        <div className="w-full h-[45rem] bg-[url(https://res.cloudinary.com/dmo7nzytn/image/upload/v1755655252/b9c740d1d10c247dc76958a892f54d110022ab2d_zrncwn.jpg)] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]"></div>
          <div className='absolute top-[350px] left-[128px] w-[592px] h-[135px] mb-[19px]'>
            <h1 className='text-[58px] text-[#BC0000] italic'>TV AO VIVO</h1>
            <h2 className='text-[18px] text-[#999999] '>
              Bem-vindo ao TV MAX Rio! Nosso canal é dedicado a levar até você o melhor conteúdo sobre a cidade maravilhosa e seu incrível estilo de vida. Aqui você encontra notícias locais, cultura, turismo, esportes, eventos e muito mais, tudo com uma pegada dinâmica e atualizada.  
            </h2>
          </div>
        </div>

        <div>
          <h1 className='text-[48px] mt-14 mb-[16px] text-white font-bold ml-10'>
            Programas
          </h1>
          <div className='flex mx-10 justify-between'>
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
              title="Conexão 21"
              subtitle="Segunda às 20h"
            />
            <VideoCard
              image="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755659104/3c575843646e55ad599a10779f42f2eea6934552_1_ijgpfl.png"
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

        <div className='px-10'>
          <h1 className='text-[48px] mt-14 mb-[16px] text-white font-bold'>
            Onde estamos
          </h1>

          <h2 className='text-[18px] mb-10 text-[#999999] '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
          </h2>

          <div className='flex justify-between'>
            <LaptopsCard/>
            <LaptopsCard/>
            <LaptopsCard/>
          </div>
        </div>


        <div className='px-10'>
          <h1 className='text-[48px] mt-14 mb-[16px] text-white font-bold'>
            Planos
          </h1>

          <h2 className='text-[18px] mb-10 text-[#999999]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
          </h2>

          <div className='flex justify-between pb-24'>
            <PlanosCard
              plano={"Plano 1"}
              desc={'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.'}
              amount={'100'}
              billing={'Mensal'}
            />
            <PlanosCard
              plano={"Plano 1"}
              desc={'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.'}
              amount={'100'}
              billing={'Mensal'}
            />
            <PlanosCard
              plano={"Plano 1"}
              desc={'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.'}
              amount={'100'}
              billing={'Mensal'}
            />
          </div>
        </div>
      </div>
    </>
  )
}
