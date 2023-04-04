import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction ,} from 'redux-thunk';
import { request, GraphQLClient } from 'graphql-request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from 'graphql-request';



export const USER_LOCK = gql`
  query users($id: ID){
    users(where:{id:$id}){
      id
      earn
      locktoken(where:{lock:true}) {
        id
        lock
        token_id
        token_uri
      }
    }
  }
`;

export const fetchUserLockData = createAsyncThunk(
  "pools/fetchUserLockData",
  async (id: string | undefined, thunkAPI) => {
    try {
      const client = new GraphQLClient("https://api.thegraph.com/subgraphs/name/sayedex/nftstking");
      const data = await client.request(USER_LOCK, { id :id?.toLocaleLowerCase()});
      return data.users;
    } catch (error) {
      console.log(error);
    }
  }
);