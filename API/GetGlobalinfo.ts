import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction ,} from 'redux-thunk';
import { request, GraphQLClient } from 'graphql-request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from 'graphql-request';



export const GLOBAL = gql`
  query globals{
    globals{
    totalstaked

  }
  }
`;

export const fetchGlobal = createAsyncThunk(
  "pools/fetchGlobal",
  async ( thunkAPI) => {
    try {
      const client = new GraphQLClient("https://api.thegraph.com/subgraphs/name/sayedex/nftstking");
      const data = await client.request(GLOBAL);
      return data.globals[0];
    } catch (error) {
      console.log(error);
    }
  }
);



