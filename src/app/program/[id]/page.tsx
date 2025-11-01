"use client"

import { Badge } from "@/components/ui/badge"
import { TabComponent } from "../../components/tabs"
import { urlApi } from "../../../../urlApi"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Loader from "@/app/components/loader";
import { useRef } from "react";

function Program({ params }: any ) {

  interface Episode {
    name: string;
    description: string;
    source: string;
    thumbnailSrc: string;
    frequency: string;
  }

  interface Season {
    name: string;
    episodes: Episode[];
  }

  interface Show {
    _id: string; // pode usar `ObjectId` se estiver tipando diretamente com Mongo
    name: string;
    description: string;
    year: string;
    seasonAmount: number;
    tag: string[];
    showFrequency: string;
    showThumbSrc: string;
    season: Season[];
  }

  
  const [tvShow, setTvShows] = useState<Show>();
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    const res = await fetch(urlApi.API_URL + `/tvmax/${params.id}`, {
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
    setLoading(false);
  }, [])

  return (<>
    { loading ? <Loader/> : 
    <div className='min-h-screen h-full w-full bg-[#141414] relative font-[Poppins]'>
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
        
        <div className="w-full min-h-screen h-[56rem] xl:h-[64rem] bg-[url(https://res.cloudinary.com/dmo7nzytn/image/upload/v1755655252/b9c740d1d10c247dc76958a892f54d110022ab2d_zrncwn.jpg)] bg-cover bg-center relative">
          <div className="absolute h-full inset-0 xl:bg-gradient-to-r bg-[#14141449] xl:from-[#141414]  xl:via-transparent xl:via-60% xl:to-transparent">
            <div className="w-full xl:w-[32%] text-white pt-[188px] p-5 xl:pl-[108px]">
              <h1 className="text-[48px] font-bold">{tvShow?.name}</h1>
              <div className="flex justify-between mt-[24px] max-w-[26rem]">
                <h2>{tvShow?.year}</h2>
                <h2>{ tvShow && tvShow?.seasonAmount + (tvShow?.seasonAmount > 1 ? " Temporadas" : " Temporada")} </h2>
                <div className="flex gap-2 flex-wrap">
                  {tvShow && tvShow?.tag.map((category: string, index: number)=> {
                    return <Badge variant={'outline'} className="text-white">{ category }</Badge>
                  })}
                </div>
              </div>
              <h2 className="mt-[24px]">
                {tvShow?.description}
              </h2>
              <div className="flex items-center mt-[44px]">
                <h2 className="text-[18px] font-bold">Assitir T1 E1</h2>
                <div className="flex ml-5 gap-2">
                  <button className="rounded-full w-[48px] h-[48px] bg-[#FF383C80] cursor-pointer flex justify-center items-center">
                    <img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755708128/Vector_t3kyxt.png" alt="" />
                  </button>
                  <button className="rounded-full w-[48px] h-[48px] bg-[#FF383C80] cursor-pointer flex justify-center items-center">
                    <img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1755708126/Vector_1_yhevuf.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 xl:pl-[108px] mt-5 xl:mt-20">
              <TabComponent seasons={tvShow && tvShow.season}/>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Program
