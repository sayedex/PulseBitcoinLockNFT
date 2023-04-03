import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useAppdispatch, useAppSelector } from "../../hooks/redux"
import { CalculatorIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';
import { Showingoutput } from './Showingoutput';
import { AiOutlineArrowDown } from "react-icons/ai";
import { ethers } from 'ethers';
import { Toast, toast } from 'react-hot-toast';
import { AddID } from '../../store/poolSlice';
import TokenABI from "../../config/ABI/Token.json";
import { Collectionaddress, Staking } from '../../config';
import { Showlist } from "./Showlist"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ContentStyle, OverlayStyle } from './config';
import { useTrsansationHelper } from '../../hooks/Trsansation';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useApprove } from '../../hooks/useApprove';
import { GetallNFTBYwallet,GetUserMintedValue,GetGlonalStaticinfo } from "../../API/GetuserBalance";
import {fetchUserLockData} from "../../API/Getuserinfo";
import { fetchGlobal } from '../../API/GetGlobalinfo';
import { RemovelockID } from '../../store/poolSlice';
type Props = {

  Input?: any,

}
export const Locktoken = forwardRef(({ Input }: Props, ref: any) => {
  const { address } = useAccount();
  //costom hook for stake fund...
  const dispatch = useAppdispatch();
  const { active, userNFT, usersellectedIDlock } = useAppSelector((state) => state.pools);
  const [open, setOpen] = useState(false);
  const { isLoading: Loadapprove, approveToken, tokenAllowance,loadinstance } = useApprove(address, dispatch);


  const { config: lockMultiple } = useTrsansationHelper(
    Staking,
    [usersellectedIDlock],
    "lockMultiple",
    TokenABI
  )
  const { config: lock } = useTrsansationHelper(
    Staking,
    usersellectedIDlock,
    "lock",
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







  const { writeAsync: lockMultipleCall, write, data, isSuccess, error } = useContractWrite(lockMultiple)
  const { writeAsync: lockcall,data:singledata } = useContractWrite(lock)

  const { isLoading, isFetching, isFetched, } = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      if (data) {
        toast.success("Locked Successfully", {
          duration: 3000,
        });
        dispatch(RemovelockID());
        setOpen(false);
        if(address){
          dispatch(GetUserMintedValue({data:address}))
          dispatch(GetGlonalStaticinfo());
          setTimeout(() => {
            dispatch(fetchGlobal());
            dispatch(fetchUserLockData(address));
          }, 5000);
        }}
      
    },
    onError() {
      toast.error("Something wrong try again", {
        duration: 3000,
      });
    }
  });


  const { isLoading:loadsingle, } = useWaitForTransaction({
    hash: singledata?.hash,
    onSettled(data, error) {
      if (data) {
        toast.success("Locked Successfully", {
          duration: 3000,
        });
        dispatch(RemovelockID());
    
        setOpen(false);
        if(address){
          dispatch(GetUserMintedValue({data:address}))
          dispatch(GetGlonalStaticinfo());
          setTimeout(() => {
            dispatch(fetchGlobal());
            dispatch(fetchUserLockData(address));
          }, 5000);
        }

      }
    
    },
    onError() {
      toast.error("Something wrong try again", {
        duration: 3000,
      });
    }
  });




  const handleMint = async () => {
    if (usersellectedIDlock.length <= 1) {
      lockcall?.();
    } else {
      lockMultipleCall?.()
    }
  }
  const handleApprove = async () => {
    approveToken?.()
  }

  const handleupdate = (tokenId: any) => {
    dispatch(AddID(tokenId))


  }


  return (
    <div>
      <Popup overlayStyle={OverlayStyle} contentStyle={ContentStyle} open={open} className="rounded-lg bg-red-400" onClose={closeModal}>
        <div className="modal rounded-lg">

          {/* header */}
          <div className=' text-white dark:text-white rounded-t-[19px]  py-4  border-b mb-4 border-gray-700'>

            <div className='flex flex-row  justify-between rounded-t-[19px] px-4'>
              <div className='text-lg font-semibold'>
                Lock Token
              </div>

              <div className='relative   h-fit'>
                <XMarkIcon onClick={() => setOpen(o => !o)} className="ext-white hover:text-gray-500 font-semibold dark:text-white cursor-pointer relative" width={22} height={22} />
              </div>
            </div>

          </div>




          {/* user userNFT */}
          <div>

            <Showlist handleupdate={handleupdate} isLock={true} data={userNFT} userSellected={usersellectedIDlock} />

          </div>



          {/* user userNFT */}






          <div className='flex flex-row w-full justify-center gap-5 px-6 mb-4'>

            {loadinstance && tokenAllowance && <button disabled={isLoading} onClick={() => handleMint()} className='bg-[#ae1bc7] uppercase text-white font-medium text-lg hover:opacity-80 w-full min-h-[50px] rounded-xl' >

              {isLoading || loadsingle ? "" : "Lock"}
              <ScaleLoader
                loading={isLoading || loadsingle}
                color="#ffffff"
                className="text-white"
                aria-label="Loading Spinner"
                data-testid="loader"
              />


            </button>}

            {!tokenAllowance && <button disabled={Loadapprove} onClick={() => handleApprove()} className='bg-[#ae1bc7] text-white font-medium text-lg hover:opacity-80 w-full min-h-[50px] rounded-xl' >

              {Loadapprove ? "" : "Approve"}
              <ScaleLoader
                loading={Loadapprove}
                color="#ffffff"
                className="text-white"
                aria-label="Loading Spinner"
                data-testid="loader"
              />

            </button>}


          </div>


          {/* buyOrSellToken */}



        </div>
      </Popup>
    </div>
  );



})

Locktoken.displayName = 'BuymodeLocktokenl';
