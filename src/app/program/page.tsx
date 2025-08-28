import { Badge } from "@/components/ui/badge"
import { TabComponent } from "../components/tabs"
import Image from "next/image"

function Program() {
  return (
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
              <h1 className="text-[48px] font-bold">Conexão 21</h1>
              <div className="flex justify-between mt-[24px] max-w-[26rem]">
                <h2>2036</h2>
                <h2>99 Temporadas</h2>
                <Badge variant={'outline'} className="text-white">Categoria</Badge>
              </div>
              <h2 className="mt-[24px]">
                Apresentado por Alberto Blois, professor universitário e empresário da área de tecnologia conversa sempre com executivos, empresários e famosos da área de TI. Segunda às 21h.
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
              <TabComponent/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Program
