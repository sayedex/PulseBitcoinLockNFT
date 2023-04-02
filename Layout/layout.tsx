
import {useAppSelector,useAppdispatch} from "../hooks/redux"
import { useEffect } from 'react';
//wagmi hook
import { GetallNFTBYwallet } from "../API/GetuserBalance";
import { useAccount } from 'wagmi';
import { Header } from "../components/Header/Header";
import { fetchUserLockData } from "../API/Getuserinfo";
import {fetchGlobal} from "../API/GetGlobalinfo"
//wallet slice 
//components..
const  Layout = (props:any)=> {
  const { address, isConnecting, isDisconnected ,isConnected} = useAccount()
   const dispatch = useAppdispatch()

useEffect(()=>{
  dispatch(GetallNFTBYwallet({data:"asa"}));
  dispatch(fetchUserLockData(address))
},[address])



useEffect(()=>{
  dispatch(fetchGlobal())
},[])


    return (
<>
  <Header/>
{props.children}
</>
    )
  }
  
  
  export default Layout