import {provider} from '../utils/providerweb3';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import TokenABI from "../config/ABI/Token.json"
// import { Token ,mintToken} from '../typeing';
import axios from "axios";

export const Gettokeninfoa = async (contractAddress:string) => {
  if(!contractAddress) return;
    const contract = new ethers.Contract(contractAddress, TokenABI.abi, provider);
    const tokensymbol = await contract.symbol();
    return {tokensymbol};
  }

  

  export const Getbalance = async (contractAddress:string,user:string) => {
    const contract = new ethers.Contract(contractAddress, TokenABI.abi, provider);
    const tokenBalance = await contract.balanceOf(user);
    const balance =  ethers.utils.formatEther(tokenBalance);
   
     const balanceOf =  Number(balance).toFixed(1)
    return {balanceOf};
  }


