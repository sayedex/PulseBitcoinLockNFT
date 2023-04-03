import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { formatNumber } from '../../utils/formatNumber'
type props = {
    img:any,
    token:string,
    value:number,
}

export function Tokenbox({img,token,value}:props) {
  return (
    <div className='flex flex-row gap-x-5 rounded-xl items-center bg-white px-6 py-3 relative  '>
        <LazyLoadImage className='absolute -left-[23px] mt-auto' src={img.src} width={50} height={50} alt="logo" />
<h1 className='font-medium ml-4 text-lg'>{formatNumber(value)}</h1>
<LazyLoadImage className='' src={img.src} width={30} height={30} alt="logo" />


    </div>
  )
}

