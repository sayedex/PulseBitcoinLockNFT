import { useState, useEffect } from 'react';
// import erc20ABI from 'path/to/erc20ABI';
import tokenabi from "../config/ABI/Token.json"
import { provider } from '../utils/providerweb3';
import erc20 from "../config/ABI/Erc20.json";
import { erc721ABI } from 'wagmi';
import TokenABI from "../config/ABI/Token.json"
import { ethers } from 'ethers';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
export const useApprove = (contractAddress:string,user:any,spender:string,native:boolean,value:string,dispatch:any) => {
  const [tokenAllowance, setTokenAllowance] = useState(0);


  const pooladress = contractAddress?.slice(2);
  const maxValue = ethers.constants.MaxUint256;

  

  const { config, isError, isLoading: loadInstance } = usePrepareContractWrite({
    address: `0x${pooladress}`,
    abi: TokenABI.abi,
    functionName: "approve(address,uint256)",
    args: [spender,ethers.utils.parseEther(Number(value)==0?"0.001":value)],
    onError(data){
   console.log("data",data);

    }
  })



  const { writeAsync:approveToken, data, isSuccess ,error} = useContractWrite(config)
  const { status, isLoading, isFetching,isFetched } = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      // ShowToast("Approve done",data?.transactionHash);
const newAllowance = Number(data?.logs[0].data)
setTokenAllowance(newAllowance)
   

    },
  })



  useEffect(() => {
    const getTokenInfo = async () => {
      if(!user && !contractAddress && !provider) return;
      try{
        const contract = new ethers.Contract(contractAddress,erc20.abi, provider);
        const fetchUserAllowance = await contract.allowance(user,spender);
        setTokenAllowance(fetchUserAllowance);   
      }catch(error){


      }
   

    };
    if(!native){
      getTokenInfo();
    }else{
      setTokenAllowance(0)
    }

  }, [contractAddress,user]);



  const updateTokenAllowance = async (value: number) => {
    setTokenAllowance(value)
  };





  return {tokenAllowance,approveToken,isLoading};
};
/// -> ->       