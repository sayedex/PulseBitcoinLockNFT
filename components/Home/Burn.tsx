import React from 'react'
import burnimg from "../../public/icon/flames.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppdispatch, useAppSelector } from "../../hooks/redux"
import { formatNumber } from '../../utils/formatNumber';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTrsansationHelperForStaicCall } from '../../hooks/Trsansation';
import { toast } from 'react-hot-toast';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { fetchGlobal } from "../../API/GetGlobalinfo";
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { GetUserMintedValue ,GetGlonalStaticinfo,} from "../../API/GetuserBalance";
import {Icon} from "./Icon"
export function Burn() {
  const { address } = useAccount();
  const { homeinfo } = useAppSelector((state) => state.pools);
  const dispatch = useAppdispatch();
  const { config } = useTrsansationHelperForStaicCall("BurnToken");

  const { writeAsync: Burn, write, data, isSuccess, error } = useContractWrite(config)
  const { isLoading, isFetching, isFetched, } = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      if (data) {
     console.log(data);
     
        const hash = data?.logs[2]?.data
        const Final  = ethers.utils.defaultAbiCoder.decode(["uint256","address","uint256"],hash);        
        const Burn = (Number(Final[0].toString())/10**18).toLocaleString();
        const User = (Number(Final[2].toString())/10**18).toLocaleString();
    
        toast.success(`Total Burned ${(Burn)} NFC,you earn ${User} NTC`, {
          duration: 9000,
        });
        setTimeout(() => {
          dispatch(fetchGlobal())
        }, 5000);

        if (address) {
          dispatch(GetUserMintedValue({ data: address }));
          dispatch(GetGlonalStaticinfo());
        }

      }
    },
    onError() {
      toast.error("Something wrong try again", {
        duration: 3000,
      });
    }
  });

  const HandleBurn = () => {
    if (!address) {
      toast.error("Walllet not connected", {
        duration: 3000,
      });
    } else if (Number(homeinfo.burnPool)== 0) {
      toast.error("Burnpool 0", {
        duration: 3000,
      });
      Burn?.();
    } else {
      Burn?.();
    }

  }

  return (
    <div className=' bigBox'>


      <div className='box bg-[#ff005e]  p-3 text-center rounded-lg'>
        <h2 className='text-white'>Burn pot {formatNumber(Number(homeinfo.burnPool))} NTC (Receive 20% of pot)</h2>
      </div>


      <div>
        <button onClick={() => HandleBurn()} className='btn bg-black border-2 border-[#ff005e] flex flex-row items-center justify-center gap-3'>
          <LazyLoadImage src={burnimg.src} width={32} height={32} />
          {isLoading ? "" : "Burn Now"}
          <ScaleLoader
            loading={isLoading}
            color="#ffffff"
            className="text-white"
            aria-label="Loading Spinner"
            data-testid="loader"
          />


        </button>
      </div>

      {/* text */}
      <div className='box p-3 text-center text-white bg-[#ff005e]'>
        <h1 className=''>Global Burn Amount</h1>
        <h1 className='iconBOX'>{formatNumber(Number(homeinfo?.totalBurned))} NTC <Icon/></h1>
      </div>


    </div>
  )
}
