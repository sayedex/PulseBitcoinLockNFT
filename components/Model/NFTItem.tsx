import React, { useState, useEffect } from 'react';
import { nftdata } from '../../typeing';
import Image from 'next/image';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import layer from "../../public/IMG/layer.png"

type Props = {
  data: nftdata[],
  userSellected: number[],
  handleupdate: (tokenId: any) => void,
  isLock?: boolean
}

type NFTProps = {
  el: nftdata,
  isSelected: boolean,
  handleupdate: (tokenId: any) => void,
}

export function NFTItem({ el, isSelected, handleupdate }: NFTProps) {
  const [image, setImage] = useState("");

  useEffect(() => {
    const callmetadata = async () => {
      const fetchmetadata = await fetch(el.token_uri).then(async (response: any) => {
        const data = await response.json();
        return data.image;
      });
      setImage(fetchmetadata);
    }
    callmetadata()
  }, [el.token_uri]);

  return (
    <div className='m-2 px-4'>
      <button onClick={() => handleupdate(Number(el.token_id))} className={`flex flex-row items-center w-full px-3 py-1 justify-between rounded-lg ${isSelected ? "bg-[#9c27b0]" : "bg-[#3a3a3a]"} `}>
        <LazyLoadImage id="layer" placeholderSrc={layer.src} className='rounded-2xl p-1' src={image ? image : ""} width={70} height={70} alt="nft" />
        <h1 className='text-2xl pr-5 font-extrabold text-slate-50'>  ID : {el.token_id}</h1>
      </button>
    </div>
  )
}