import { useState, useEffect } from 'react';
// import erc20ABI from 'path/to/erc20ABI';
import tokenabi from "../config/ABI/Token.json"
// import { provider } from '../utils/providerweb3';
import erc721 from "../config/ABI/erc721.json"
import { ethers } from 'ethers';
import { erc721 as Contrctaddressforcollection, Staking} from "../config/index"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useProvider } from 'wagmi';
export const useApprove = ( user: any, dispatch: any) => {
  const [tokenAllowance, setTokenAllowance] = useState(false);
  const [loadinstance,setloadinstance] = useState(false)
  const pooladress = Contrctaddressforcollection?.slice(2);

  const { config, } = usePrepareContractWrite({
    address: `0x${pooladress}`,
    abi: erc721.abi,
    functionName: "setApprovalForAll",
    args: [Staking, 1],
    onError(data) {
      console.log("data", data);

    }
  })
 const provider = useProvider();

  const { writeAsync: approveToken, data, isSuccess, error } = useContractWrite(config)
  const { status, isLoading, isFetching, isFetched } = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      setTokenAllowance(true);
      setloadinstance(true)

    },
    onError(){

    }
  })


  useEffect(() => {
    const getTokenInfo = async () => {
      if (!user  && !provider) return;
      try {
        const contract = new ethers.Contract(Contrctaddressforcollection, erc721.abi, provider);
        const fetchUserAllowance = await contract.isApprovedForAll(user, Staking);
        setTokenAllowance(fetchUserAllowance);
        setloadinstance(true)
      } catch (error) {


      }


    };
    getTokenInfo();
  }, [user]);


  return { tokenAllowance, approveToken, isLoading,loadinstance };
};
/// -> ->       