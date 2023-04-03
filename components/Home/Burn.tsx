import React from 'react'
import burnimg from "../../public/icon/burns.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppdispatch, useAppSelector } from "../../hooks/redux"
import { formatNumber } from '../../utils/formatNumber';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTrsansationHelperForStaicCall } from '../../hooks/Trsansation';
import { toast } from 'react-hot-toast';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import {fetchGlobal} from "../../API/GetGlobalinfo"
export function Burn() {
    const { global} = useAppSelector((state) => state.pools);
    const dispatch = useAppdispatch();
    const {config} = useTrsansationHelperForStaicCall("BurnToken");

    const { writeAsync: Burn, write, data, isSuccess, error } = useContractWrite(config)
    const { isLoading, isFetching, isFetched, } = useWaitForTransaction({
      hash: data?.hash,
      onSettled(data, error) {
        if (data) {
          const Burn = data.logs[0].topics[2]
          toast.success(`Total Burned ${Number(Burn)},you earn 10 NTC`,{
            duration: 9000,
        });
        dispatch(fetchGlobal());

        }
      },
      onError(){
        toast.error("Something wrong try again",{
            duration: 9000,
        });
      }
    });
    

    const HandleBurn = ()=>{
      if(global.burnPool ==0){
        toast.error("Burnpool 0",{
          duration: 9000,
      });
      Burn?.();
      }else{
        Burn?.();
      }
      
    }
    
    return (
    <div className=' bigBox'>


<div className='box bg-[#ff005e]  p-3 text-center rounded-lg'>
<h2 className='text-white'>Burn pot {formatNumber(Number(global.burnPool)/10**18)} NTC (Receive 20% of pot)</h2>
</div>


<div>
<button onClick={()=>HandleBurn()}  className='btn bg-black border-2 border-[#ff005e] flex flex-row items-center justify-center gap-3'>
    <LazyLoadImage src={burnimg.src} width={32} height={32}/>
    {isLoading?"":"Burn Now"}
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
<h1>{formatNumber(Number(global.totalBurned)/10**18)} NTC</h1>
</div>


    </div>
  )
}
