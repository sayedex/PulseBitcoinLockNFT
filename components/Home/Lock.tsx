import React,{useRef} from 'react';
import { Locktoken } from '../Model/Locktoken';
import {Unlocktoken} from '../Model/Unlocktoken';
import { useAccount } from 'wagmi';
import { Toast, toast } from 'react-hot-toast';
import { useAppdispatch, useAppSelector } from "../../hooks/redux"
import { formatNumber } from '../../utils/formatNumber';
import { fetchUserLockData } from '../../API/Getuserinfo';
type Props = {}

export function Lock() {
  const {address} =useAccount()
  const { global,userNFT,userLockedNFT,loadnft,loadLocknft} = useAppSelector((state) => state.pools);
 const dispatch = useAppdispatch();
    const ShowLockModel = useRef<{ openPopup: () => void ,closePopup:()=>void}>(null);
    const UnlockLockModel = useRef<{ openPopup: () => void ,closePopup:()=>void}>(null);
 const HanleLockOpen = ()=>{
  if(!address){
    toast.error("Walllet not connected",{
      duration: 9000,
  });
  }else if(loadnft=="done" && userNFT.length==0){
    toast.error("You don't have any nft",{
      duration: 9000,
  });
  }else if(loadnft=="done"){
    ShowLockModel.current?.openPopup();
  }
 
 }
 
 

 const HanleUnlockOpen = ()=>{
  if(!address){
    toast.error("Walllet not connected",{
      duration: 9000,
  });
  }else{
    dispatch(fetchUserLockData(address));
    UnlockLockModel.current?.openPopup()
  }

}


  return (
    <div className='bigBox'>


        {/* button */}
<div className='flex flex-row gap-2  '>
    <button disabled={loadnft=="loading"?true:false} onClick={()=>HanleLockOpen()} className='btn'>{loadnft=="loading"?"Loading":"Lock"}</button>

    <button disabled={loadLocknft=="loading"?true:false} onClick={()=>HanleUnlockOpen()} className='btn'>{loadLocknft=="loading"?"Loading":"Unlock"}</button>
</div>
     {/* button */}



    {/* text */}
<div className='box p-3 text-center bg-black  border-2 border-[#790082]'>
<h2 className='text-white'>{`"Burnt Royalties: ${userNFT.length} of 33"`} </h2>
</div>
     {/* text */}


{/* text */}
<div className='box p-3 text-center text-white'>
<h1 className=''>Total NTC in existance</h1>
<h1>{formatNumber(Number(global?.totalsupply)/10**18)} NTC</h1>
</div>

{/* text */}

     <div className='absolute'>
     <Locktoken ref={ShowLockModel} />
        <Unlocktoken ref={UnlockLockModel} />
     </div>
    </div>
  )
}

