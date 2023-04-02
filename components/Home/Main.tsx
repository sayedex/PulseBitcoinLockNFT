import React from 'react'
import { Static } from './Static'
import {Lock} from "./Lock";
import {Burn} from "./Burn";
import {Harvest} from "./Harvest"
export function Main() {
  return (
    <div className='pt-16 max-w-7xl m-auto pb-20'>
        <Static/>
 <div className='flex flex-col md:flex-row flex-wrap m-auto justify-center items-center gap-5 pt-16 h-full '>
 <Lock/>
  <Burn/>
<Harvest/>
 </div>
    </div>
  )
}

