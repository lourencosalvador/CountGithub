"use client"
import Image from 'next/image'
import background from '../../public/background.jpg'
import perfil from '../../public/perfil.jpg'
import { useRef, useState } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

type dataCount = {
  avatar_url: string,
  name: string,
  bio: string
}
export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [err, setErr] = useState("")
  const [state, setState] = useState(false)
  const handleCount = async(event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter" && inputRef.current){
     try{
      const response =  await axios.get<dataCount>
    (`https:api.github.com/users/${inputRef.current.value}`)
      const data = await response.data
      setState(true)
      console.log(data)
      setAvatar(data.avatar_url)
      setName(data.name)
      setBio(data.bio)
     } catch(err) {
          setErr("Erro ao encontrar o repositorio: " + inputRef.current.value)
     }
    }
  }
  return (
      <div className='absolute w-screen h-screen overflow-hidden'>
       <div className='relative opacity-[0.3]'>
       <Image 
       src={background}
       alt='img backgoround'
       className='w-screen h-screen  object-cover'
     />
       </div>

     <div className='relative w-auto h-auto justify-center items-center top-[-500px] flex flex-col gap-10 '>
      <div className='flex flex-col gap-4'>
      <label className='ml-[20px] text-xl font-semibold'>Pesquise o seu repositorio 💻👌</label>
      <input type="text" 
       ref={inputRef}
       onKeyDown={handleCount}
       className='w-[22rem] h-[40px] px-3 outline-none rounded-sm bg-transparent border-blue-400 border-[1px] text-slate-100 text-[14px]'
      />
      </div>
      <div className=' w-[400px] h-auto flex flex-col gap-4 justify-center items-center'>
           {
            state ? (
              <>
              <div className='w-[100px] h-[100px] bg-blue-400 rounded-full overflow-hidden'>
              <Image
                src={avatar}
                width="100" height="100"
                alt='perfil'
                className='w-[100px] h-[100px] object-cover'
              />
           </div>
           <h1 className='text-[25px] font-medium '>{name}</h1>
           <p className='text-[18px] text-center font-ligth'>{bio}</p>
              </>
            ) : err ? <p className='text-[18px] text-center font-ligth'>{err}</p> : <CircularProgress />
           }
           
       </div>
     </div>
 
     
      </div>
  )
}
