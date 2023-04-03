import React from 'react';
import { nftdata } from '../../typeing';
import Image from 'next/image';
import { LazyLoadComponent ,LazyLoadImage } from 'react-lazy-load-image-component';
type Props = {
    data: nftdata[],
    userSellected:number[],
    handleupdate:(tokenId:any)=>void,
    isLock?:boolean
}

export function Showlist({ data,handleupdate,userSellected ,isLock}: Props) {
    return (
        <div className='overflow-y-auto max-h-[500px]'>

            {
                data?.map((el: nftdata, indx) => {
                    const metedata =isLock && JSON.parse(el.metadata);
                    const image=isLock&&  metedata?.image;
    
                    const isSelected = userSellected.includes(Number(el.token_id));
                    
                    return (
                      <div className='m-2 px-4' key={indx}>
                          <button onClick={()=>handleupdate(Number(el.token_id))} className={`flex flex-row items-center w-full px-3 py-1 justify-between rounded-lg ${isSelected?"bg-[#9c27b0]":"bg-[#3a3a3a]"} `}>
                            <LazyLoadImage className='rounded-2xl p-1' src={isLock?image:""} width={70} height={70} alt="nft" />
                         <h1 className='text-2xl pr-5 font-extrabold text-slate-50'>  ID : {el.token_id}</h1>
    
                        </button>
                      </div>
                    )
                })
            }





        </div>
    )
}

