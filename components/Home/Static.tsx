import React from 'react'
import Test from "../../public/test.png"
import { useAppdispatch, useAppSelector } from "../../hooks/redux"


export const Static = () => {
  const { active, userNFT} = useAppSelector((state) => state.pools);

  return (
    <div className='flex flex-col gap-y-10 md:flex-row justify-center gap-x-52	items-center'>
{/* image */}
<div>
<img className=' w-11/12 m-auto md:w-[350px] rounded-lg' src={Test.src} alt="nft" />
</div>
{/* image */}


{/* box */}
<div className='bg-[#ff005e]  w-11/12 h-fit px-24 py-14 font-semibold tracking-[1px] rounded-lg text-white flex flex-col gap-y-6 max-w-md justify-center text-center'>


 <h2>Global Royality</h2> 
 <h2>Minting Power</h2> 
 <h2>{userNFT?.length} of 32</h2> 
</div>
{/* box */}

    </div>
  )
}

