import React from 'react'
import Image from 'next/image'
type Props = {
    name:string,
    value:number
}

export const Showingoutput = ({name,value}: Props) => {
  return (
    <div>
        <div className='flex flex-row justify-between border-b bg-[#414141] m-5 items-center px-4  border dark:border-none  relative h-fit rounded-3xl py-2 '>


        <div>
    {value}
</div>

{/* input  */}

<div className='  border dark:border-none rounded-3xl h-[40px]'>
    <span className='cursor-pointer  rounded-3xl hover:bg-slate-700 uppercase'>
      <div className='flex flex-row gap-x-2 p-2'>
        <Image className='relative' src={`/Token/${name}.svg`} width={22} height={22} alt={name} /> {name}
      </div>
    </span>
  </div>
{/* input  */}

</div>
    </div>
  )
}

