import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction, current, Slice } from "@reduxjs/toolkit";
import { nftdata, userLockedNFT, Global,HomeInfo } from "../typeing";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { GetallNFTBYwallet, GetUserMintedValue ,GetGlonalStaticinfo} from "../API/GetuserBalance"
import { fetchUserLockData ,} from "../API/Getuserinfo";
import { fetchGlobal } from "../API/GetGlobalinfo"
interface PoolsState {
  active: boolean,
  userNFT: nftdata[],
  usersellectedIDlock: number[],
  usersellectedIDunlock: number[]
  userLockedNFT: userLockedNFT,
  userNTCbalance: string,
  userpedingbalance:string,
  loadnft:"idle" | "loading" | "done",
  loadLocknft:"idle" | "loading" | "done",
  homeinfo:HomeInfo,
  userTotalminted:string
}


const initialState: PoolsState = {
  active: true,
  userNFT: [],
  usersellectedIDlock: [],
  usersellectedIDunlock: [],
  userLockedNFT: {
    id: "",
    locktoken: [],
    earn: 0
  },
  userNTCbalance: "0",
  userpedingbalance:"0",
  loadnft:'idle',
  loadLocknft:'idle',
  homeinfo:{
    burnPool:"0",
    totalBurned:"0",
    totalsupply:"0",
    totalstaked:"0"
  },
  userTotalminted:"0"

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
    RemovelockID:(state,) => {
      const nft = state.usersellectedIDlock;
      const updatedUserNFT = state.userNFT?.filter((tokenId) => !nft.includes(Number(tokenId.token_id)));
      console.log(updatedUserNFT);
      state.userNFT = updatedUserNFT;
    
    },
    RemoveunlockID:(state) => {
      const nft = state.usersellectedIDunlock;
      const updatedUserNFT = state.userLockedNFT?.locktoken?.filter((tokenId) => !nft.includes(Number(tokenId.token_id)));
   if(state.userLockedNFT?.locktoken){
    state.userLockedNFT.locktoken = updatedUserNFT;
   }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(GetallNFTBYwallet.pending, (state, action: PayloadAction<any>) => {
    state.loadnft = 'loading'
    }),
    builder.addCase(GetallNFTBYwallet.fulfilled, (state, action: PayloadAction<any>) => {
      state.userNFT = action.payload[0];
      state.userNTCbalance = action.payload[1];
      state.loadnft = 'done'

    }),
      builder.addCase(fetchUserLockData.pending, (state, action: PayloadAction<any>) => {
      state.loadLocknft = "loading"

      }),
      builder.addCase(fetchUserLockData.fulfilled, (state, action: PayloadAction<any>) => {
        state.userLockedNFT = action.payload[0];
        state.loadLocknft = 'done'

      }),
      builder.addCase(GetUserMintedValue.fulfilled, (state, action) => {
        const {totalminedByusers,calculateReward} = action.payload.getmintedbalance;
        state.userNTCbalance = action.payload.balance;
        state.userTotalminted  = totalminedByusers;
        state.userpedingbalance = calculateReward;

      }),
      builder.addCase(GetGlonalStaticinfo.fulfilled, (state, action) => {
        if(action.payload){
          state.homeinfo = action.payload;
        }
      })
  },
});

//GetGlonalStaticinfo
export const { AddID, AddIDUnlock,RemovelockID ,RemoveunlockID} = poolsSlice.actions;
export default poolsSlice.reducer;




