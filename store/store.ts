import { configureStore } from '@reduxjs/toolkit';
import poolsSlice from './poolSlice';
const store = configureStore({
    reducer: {
        pools: poolsSlice,

    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch