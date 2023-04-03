import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { usePrepareContractWrite, } from 'wagmi';
import tokenABI from "../config/ABI/Token.json";
import { Staking } from '../config';
export const useTrsansationHelper = (contractAddress:string,args:any,fname:string,tokenABI:any) => {


  const pooladress = contractAddress?.slice(2);
  const { config, isError, isLoading: loadInstance } = usePrepareContractWrite({
    address: `0x${pooladress}`,
    abi: tokenABI.abi,
    functionName: fname,
    args: [...args],
    onError(data){


    }
  })

  return {config};
};
/// -> ->       



export const useTrsansationHelperForStaicCall = (fname:string) => {
  const pooladress = Staking?.slice(2);
  const { config, isError, isLoading: loadInstance } = usePrepareContractWrite({
    address: `0x${pooladress}`,
    abi: tokenABI.abi,
    functionName: fname,
    onError(data){


    }
  })

  return {config};
};
/// -> ->       