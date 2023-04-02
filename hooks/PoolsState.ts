import {useAppSelector,useAppdispatch} from "../hooks/redux"

export const PoolState = () => {
    const PoolState = useAppSelector((state) => state.pools);
    return PoolState;
  };
  
