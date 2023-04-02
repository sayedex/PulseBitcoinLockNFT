import React,{useRef} from 'react';
import { Locktoken } from '../Model/Locktoken';
import {Unlocktoken} from '../Model/Unlocktoken';
import { useAccount } from 'wagmi';
import { Toast, toast } from 'react-hot-toast';
import { useAppdispatch, useAppSelector } from "../../hooks/redux"
import { formatNumber } from '../../utils/formatNumber';

type Props = {}

export function Lock() {
  const {address} =useAccount()
  const { global} = useAppSelector((state) => state.pools);

    const ShowLockModel = useRef<{ openPopup: () => void ,closePopup:()=>void}>(null);
    const UnlockLockModel = useRef<{ openPopup: () => void ,closePopup:()=>void}>(null);
 const HanleLockOpen = ()=>{
  if(!address){
    toast.error("Walllet not connected",{
      duration: 9000,
  });
  }else{
    ShowLockModel.current?.openPopup()
  }
 
 }

 const HanleUnlockOpen = ()=>{
  if(!address){
    toast.error("Walllet not connected",{
      duration: 9000,
  });
  }else{
    UnlockLockModel.current?.openPopup()
  }

}


  return (
    <div className='bigBox'>


        {/* button */}
<div className='flex flex-row gap-2  '>
    <button onClick={()=>HanleLockOpen()} className='btn'>Lock</button>

    <button onClick={()=>HanleUnlockOpen()} className='btn'>unlock</button>
</div>
     {/* button */}



    {/* text */}
<div className='box p-3 text-center bg-black  border-2 border-[#ff005e]'>
<h2 className='text-white'>Burnt Royalties</h2>
</div>
     {/* text */}


{/* text */}
<div className='box p-3 text-center text-white'>
<h1 className=''>Total NTC in existance</h1>
<h1>{formatNumber(Number(global?.totalsupply - global.totalBurned)/10**18)}</h1>
</div>

{/* text */}

     <div className='absolute'>
     <Locktoken ref={ShowLockModel} />
        <Unlocktoken ref={UnlockLockModel} />
     </div>
    </div>
  )
}

