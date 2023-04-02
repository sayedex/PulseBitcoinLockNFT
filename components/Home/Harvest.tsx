import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTrsansationHelperForStaicCall } from '../../hooks/Trsansation';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { toast } from 'react-hot-toast';
import { useAppdispatch, useAppSelector } from "../../hooks/redux";
import { formatNumber } from '../../utils/formatNumber';
import ScaleLoader from "react-spinners/ScaleLoader";

const totalsupplymax= 31000000
export function Harvest() {
    const { global,userLockedNFT} = useAppSelector((state) => state.pools);


    const {config} = useTrsansationHelperForStaicCall("harvest")
    const { writeAsync: Harvest, write, data, isSuccess, error } = useContractWrite(config)
    const { isLoading, isFetching, isFetched, } = useWaitForTransaction({
      hash: data?.hash,
      onSettled(data, error) {
        if (data) {
          toast.success("Harvest Successfull",{
            duration: 9000,
        });
        }
      },
      onError(){
        toast.error("Something wrong try again",{
            duration: 9000,
        });
      }
    });


    const HandleHarvest = ()=>{
        Harvest?.();
    }


  return (
    <div className=' bigBox'>


<div className=' p-3  text-center  box'>
<h2 className='text-white'>Minted : {formatNumber(userLockedNFT?.earn/10**18)} NTC</h2>
</div>


<div>
<button disabled={isLoading} onClick={()=>HandleHarvest()}  className='btn bg-black border-2 border-[#790082] flex flex-row items-center justify-center gap-3'>
{isLoading?"":"Harvest"}
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
<h1 className=''>Total Minted : {(Number(global?.totalsupply)/10**18).toLocaleString()}</h1>
<h1>of {totalsupplymax.toLocaleString()}</h1>
</div>


    </div>
  )
}
