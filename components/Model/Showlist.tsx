import React,{useState,useEffect} from 'react';
import { nftdata } from '../../typeing';
import Image from 'next/image';
import { LazyLoadComponent ,LazyLoadImage, } from 'react-lazy-load-image-component';
import layer from "../../public/IMG/layer.png";
import {NFTItem} from "./NFTItem"
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
                
                    const isSelected = userSellected.includes(Number(el.token_id));
                    
                    return (
                      <NFTItem el={el} key={indx} handleupdate={handleupdate} isSelected={isSelected} />
        
                    )
                })
            }





        </div>
    )
}

