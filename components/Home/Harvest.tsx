import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTrsansationHelperForStaicCall } from '../../hooks/Trsansation';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { toast } from 'react-hot-toast';
import { useAppdispatch, useAppSelector } from "../../hooks/redux";
import { formatNumber } from '../../utils/formatNumber';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useAccount } from 'wagmi';
const totalsupplymax = 31000000;
import { GetallNFTBYwallet, GetUserMintedValue,GetGlonalStaticinfo } from "../../API/GetuserBalance";
import { fetchGlobal } from "../../API/GetGlobalinfo";
export function Harvest() {
  const { userLockedNFT, userpedingbalance,homeinfo ,userTotalminted} = useAppSelector((state) => state.pools);
  const { address } = useAccount();
  const dispatch = useAppdispatch()
  const { config } = useTrsansationHelperForStaicCall("harvest")
  const { writeAsync: Harvest, write, data, isSuccess, error } = useContractWrite(config)
  const { isLoading, isFetching, isFetched, } = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      if (data) {
        toast.success("Harvest Successfull", {
          duration: 3000,
        });

        setTimeout(() => {
          dispatch(fetchGlobal())
        }, 7000);


      }

      if (address) {
        dispatch(GetUserMintedValue({ data: address }));
        dispatch(GetGlonalStaticinfo());
      }
    },
    onError() {
      toast.error("Something wrong try again", {
        duration: 3000,
      });
    }
  });



  const HandleHarvest = () => {
    if (address) {
      dispatch(GetUserMintedValue({ data: address }));
    }

    if (!address) {
      toast.error("Walllet not connected", {
        duration: 3000,
      });
    } else if (Number(userpedingbalance) <= 0) {
      toast.error("Not enough fund to harvest", {
        duration: 3000,
      });
    } else {
      Harvest?.();
    }
  }


  return (
    <div className=' bigBox'>


      <div className=' p-3 text-center  box flex flex-row justify-around'>
        <div className=''>
          <h2 className='text-white'>Mining : {formatNumber(Number(userpedingbalance))} NTC</h2>
        </div>
        <div>
          <h2 className='text-white'>Mined : {formatNumber(Number(userTotalminted)) } NTC</h2>
        </div>
      </div>


      <div>
        <button disabled={isLoading} onClick={() => HandleHarvest()} className='btn bg-black border-2 border-[#790082] flex flex-row items-center justify-center gap-3'>
          {isLoading ? "" : "Harvest"}
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
      <div className=' p-3 text-center  box'>
        <h1 className=''>Total Mined : {Number(homeinfo.totalsupply).toLocaleString()} NTC</h1>
        <h1>of {totalsupplymax.toLocaleString()} NTC</h1>
      </div>


    </div>
  )
}
