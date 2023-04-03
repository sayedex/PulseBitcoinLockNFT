import {provider} from '../utils/providerweb3';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import TokenABI from "../config/ABI/Erc20.json"
import StakingABI from "../config/ABI/Token.json"
// import { Token ,mintToken} from '../typeing';
import axios from "axios";
import { Staking } from '../config';

export const Gettokeninfoa = async (contractAddress:string) => {
  if(!contractAddress) return;
    const contract = new ethers.Contract(contractAddress, TokenABI.abi, provider);
    const tokensymbol = await contract.symbol();
    return {tokensymbol};
  }


  export const Getbalance = async (user:string) => {
    const contract = new ethers.Contract(Staking, TokenABI.abi, provider);
    const tokenBalance = await contract.balanceOf(user);
    const balance =  ethers.utils.formatEther(tokenBalance);
     const balanceOf =  Number(balance).toFixed(1)
     return balanceOf
  }


  export const GetmintedBalance = async (user:string) => {
    const contract = new ethers.Contract(Staking, StakingABI.abi, provider);
    const tokenBalance = await contract.calculateReward(user);
    const balance =  ethers.utils.formatEther(tokenBalance);
     const calculateReward =  Number(balance).toFixed(1);
     const totalminedByuser = await contract.totalminedByuser(user);
     const totalminedByusers =  ethers.utils.formatEther(totalminedByuser);
     return {calculateReward,totalminedByusers}
  }


  export const Allinfo = async () => {
try{
  const contract = new ethers.Contract(Staking, StakingABI.abi, provider);
  const supply = await contract.totalSupply();
  const totalsupply =  ethers.utils.formatEther(supply);
  const totalBurnedcall =  await contract.totalBurned(); 
  const totalBurned =  ethers.utils.formatEther(totalBurnedcall);
  const burnPools = await contract.burnPool(); 
  const burnPool = ethers.utils.formatEther(burnPools);
  const totalstakeds = await contract.totalstaked(); 
  const totalstaked = totalstakeds?totalstakeds.toNumber():"0"
  
   return {totalsupply,totalBurned,burnPool,totalstaked}
}catch(error){
  console.log(error);
  
}
  }

