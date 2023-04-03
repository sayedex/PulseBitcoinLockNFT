import React from 'react'
import Test from "../../public/Token/home.jpeg"
import { useAppdispatch, useAppSelector } from "../../hooks/redux"
import crown from "../../public/Token/crown.png"
import { LazyLoadImage } from 'react-lazy-load-image-component'
export const Static = () => {
  const { active, userNFT,homeinfo} = useAppSelector((state) => state.pools);

  return (
    <div className='flex flex-wrap lg:flex-row m-2 md:m-0 gap-x-5 gap-y-5 sm:p-0 md:p-8   mr-auto  z-0 	items-center '>
  
{/* image */}
<div className='md:flex-1  w-11/12  m-auto '>
<img className='  md:max-w-[350px] rounded-lg' src={Test.src} alt="nft" />
</div>
{/* image */}


{/* box */}
<div className='bg-[#ff005e] md:flex-1 w-full   m-10 md:m-0 relative  h-fit px-24 py-14 font-semibold tracking-[1px] rounded-lg text-white flex flex-col gap-y-6 max-w-md justify-center text-center'>
<LazyLoadImage className='hidden md:block  absolute transform rotate-[39deg]	  right-[-45px] top-[-28px]' src={crown.src} width={100} height={100} />
<LazyLoadImage className='block md:hidden  absolute transform rotate-[39deg]	 right-[-15px] top-[-6px]' src={crown.src} width={70} height={70} />

 <h2>Global Royality</h2> 
 <h2>Mining Power</h2> 
 <h2>{homeinfo?.totalstaked} of 32</h2> 

</div>
{/* box */}

<div>

</div>

    </div>
  )
}

