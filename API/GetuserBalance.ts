import {provider} from '../utils/providerweb3';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import TokenABI from "../config/ABI/Token.json"
import { nftdata} from '../typeing';
import { AllowNFTID ,Collectionaddress} from '../config';
import axios from "axios";

  const options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-Key': 'hfFDDgyJiGcA93sEfRWQF61kqPD66rc7etsRDlEjjOZxQ3LVNZKMYRyB2Na3vx6f'}};




function filterNFTs(nftData: nftdata[], allowedAddress: string, allowedTokenIds: number[]): any[] {
  return nftData.filter(nft => 
    nft.token_address.toLowerCase() === allowedAddress.toLowerCase() &&
    allowedTokenIds.includes(parseInt(nft.token_id))
  );
}




  export const GetallNFTBYwallet = createAsyncThunk(
    'GetallNFTBYwallet',
    async (params: { data:string | undefined}, { dispatch }) => {
      const output = await axios.get(
            `https://deep-index.moralis.io/api/v2/${params.data}/nft?chain=eth&format=decimal&media_items=false`,
            options
          );
       return filterNFTs(output.data.result,Collectionaddress,AllowNFTID);

    }
  );  

  



