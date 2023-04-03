import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction, current,Slice } from "@reduxjs/toolkit";
import {nftdata,userLockedNFT,Global} from "../typeing";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {GetallNFTBYwallet, } from "../API/GetuserBalance"
import { fetchUserLockData } from "../API/Getuserinfo";
import {fetchGlobal} from "../API/GetGlobalinfo"
interface PoolsState {
  active: boolean,
  userNFT:nftdata[],
  usersellectedIDlock: number[],
  usersellectedIDunlock: number[]
  userLockedNFT:userLockedNFT,
  global:Global
  userNTCbalance:string
}


const initialState: PoolsState = {
  active: true,
  userNFT:[],
  usersellectedIDlock:[],
  usersellectedIDunlock:[],
  userLockedNFT:{
    id:"",
    locktoken:[],
    earn:0
  },
  global:{
    totalBurned:0,
    totalharvest:0,
    totalsupply:0,
    burnPool:0,
    totalstaked:0
  },
  userNTCbalance:"0"

};

// Defin e the slice for pools data and token prices
const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<boolean>) => {
      // implement the reducer logic here
    },
    AddID: (state, action: PayloadAction<number>) => {
      const nftId = action.payload;
      const isSelected = state.usersellectedIDlock.includes(nftId);
      if (isSelected) {
        state.usersellectedIDlock = state.usersellectedIDlock.filter((id) => id !== nftId);
      } else {
        state.usersellectedIDlock.push(nftId);
      }
    },
    AddIDUnlock: (state, action: PayloadAction<number>) => {
      const nftId = action.payload;
      const isSelected = state.usersellectedIDunlock.includes(nftId);
      if (isSelected) {
        state.usersellectedIDunlock = state.usersellectedIDunlock.filter((id) => id !== nftId);
      } else {
        state.usersellectedIDunlock.push(nftId);
      }
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(GetallNFTBYwallet.fulfilled, (state, action:PayloadAction<any>) => {
    state.userNFT= action.payload[0];
    state.userNTCbalance = action.payload[1];

    }),
    builder.addCase(fetchUserLockData.fulfilled, (state, action:PayloadAction<any>) => {
   state.userLockedNFT = action.payload[0];
    
      }),
      builder.addCase(fetchGlobal.fulfilled, (state, action:PayloadAction<any>) => {
       state.global = action.payload;
        
         
           });
  },
});

export const {AddID ,AddIDUnlock} = poolsSlice.actions;
export default poolsSlice.reducer;




