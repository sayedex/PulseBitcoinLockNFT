import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useAppdispatch, useAppSelector } from "../../hooks/redux"
import { CalculatorIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';
import { Showingoutput } from './Showingoutput';
import { AiOutlineArrowDown } from "react-icons/ai";
import { ethers } from 'ethers';
import { Toast, toast } from 'react-hot-toast';
import { AddID ,AddIDUnlock} from '../../store/poolSlice';
import TokenABI from "../../config/ABI/Token.json";
import { Collectionaddress, Testaddresss } from '../../config';
import { Showlist } from "./Showlist"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ContentStyle, OverlayStyle } from './config';
import { useTrsansationHelper } from '../../hooks/Trsansation';
import ScaleLoader from "react-spinners/ScaleLoader";
import {RemoveunlockID} from "../../store/poolSlice"
import { fetchUserLockData } from '../../API/Getuserinfo';
import { GetallNFTBYwallet,GetUserMintedValue } from "../../API/GetuserBalance";

type Props = {

  Input?: any,

}
export const Unlocktoken = forwardRef(({ Input }: Props, ref: any) => {
  const { address } = useAccount();
  //costom hook for stake fund...
  const dispatch = useAppdispatch();
  const { active, userNFT, usersellectedIDunlock,userLockedNFT,loadLocknft} = useAppSelector((state) => state.pools);
  const [open, setOpen] = useState(false);

  const { config: unlockMultiple } = useTrsansationHelper(
    Testaddresss,
    [usersellectedIDunlock],
    "unlockMultiple",
    TokenABI
  )
  const { config: unlock } = useTrsansationHelper(
    Testaddresss,
    usersellectedIDunlock,
    "unlock",
    TokenABI
  )

  useImperativeHandle(ref, () => {
    return {
      openPopup: () => setOpen(true),
      closePopup: () => setOpen(false),
    };
  });


  const closeModal = () => {
    setOpen(false);
  }





  const { writeAsync: unlockMultipleCall, write, data, isSuccess, error } = useContractWrite(unlockMultiple)
  const { writeAsync: unlocks,data:singledata } = useContractWrite(unlock);

  const { isLoading, isFetching, isFetched, } = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      if (data) {
        toast.success("Unlocked Successfully",{
            duration: 2000,
        });
        if(address){
          dispatch(GetUserMintedValue({data:address}));
          setTimeout(() => {
            dispatch(GetallNFTBYwallet({data:address}));
          }, 4000);
          dispatch(RemoveunlockID())
          setOpen(false);
         }
   

    
      }
    },
    onError(){
        toast.error("Something wrong try again",{
            duration: 2000,
        });
      }
  });


  const { isLoading:loadsingle, } = useWaitForTransaction({
    hash: singledata?.hash,
    onSettled(data, error) {
      if (data) {
        toast.success("Unlocked Successfully",{
            duration: 2000,
        });
        if(address){
          dispatch(GetUserMintedValue({data:address}))
          setTimeout(() => {
            dispatch(GetallNFTBYwallet({data:address}));
          }, 4000);
          dispatch(RemoveunlockID())
          setOpen(false);
         }
      }
    },
    onError(){
        toast.error("Something wrong try again",{
            duration: 2000,
        });
      }
  });



  const handleMint = async () => {
    if(!userLockedNFT?.locktoken) return;
    if (usersellectedIDunlock.length <= 1) {
        unlocks?.();
        console.log("sdas");
        
    } else {
        unlockMultipleCall?.();
        
    }
  }




  const handleupdate = (tokenId: any) => {
    dispatch(AddIDUnlock(tokenId))


  }
  const Loadmore = ()=>{
    dispatch(fetchUserLockData(address));
  }


  return (
    <div>
      <Popup overlayStyle={OverlayStyle} contentStyle={ContentStyle} open={open} className="rounded-lg bg-red-400" onClose={closeModal}>
        <div className="modal rounded-lg">

          {/* header */}
          <div className=' text-white dark:text-white rounded-t-[19px]  py-4  border-b mb-4 border-gray-700'>

            <div className='flex flex-row  justify-between rounded-t-[19px] px-4'>
              <div className='text-lg font-semibold'>
                Unlock Token
              </div>

              <div className='relative   h-fit'>
                <XMarkIcon onClick={() => setOpen(o => !o)} className="ext-white hover:text-gray-500 font-semibold dark:text-white cursor-pointer relative" width={22} height={22} />
              </div>
            </div>

          </div>




          {/* user userNFT */}
          <div>

            <Showlist handleupdate={handleupdate} isLock={false} data={userLockedNFT?.locktoken} userSellected={usersellectedIDunlock} />
      <div className='flex s justify-center m-3'>
      <ScaleLoader
         loading={loadLocknft=="loading"?true:false}
        color="#ffffff"
        className="text-white"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
{loadLocknft=="done" && userLockedNFT?.locktoken.length ==0? <h1 className='text-white text-center text-lg p-3'>{`You didn't lock any nft`}</h1>:null}
          </div>



          {/* user userNFT */}






          <div className='flex flex-row w-full justify-center gap-5 px-6 mb-4'>
          <button  onClick={() => Loadmore()} className='bg-[#ae1bc7] uppercase text-white font-medium text-lg hover:opacity-80 w-full min-h-[50px] rounded-xl' >
            
          Update

            </button>

            <button disabled={isLoading} onClick={() => handleMint()} className='bg-[#ae1bc7] uppercase text-white font-medium text-lg hover:opacity-80 w-full min-h-[50px] rounded-xl' >
            
            {isLoading || loadsingle?"":"Unlock"}
    <ScaleLoader
        loading={isLoading || loadsingle}
        color="#ffffff"
        className="text-white"
        aria-label="Loading Spinner"
        data-testid="loader"
      />

            
            </button>

          
          </div>


          {/* buyOrSellToken */}



        </div>
      </Popup>
    </div>
  );



})

Unlocktoken.displayName = 'Unlocktoken';
