import Head from 'next/head'
import { GetStaticProps } from 'next'
import {Main} from "../components/Home/Main"
export default function  Home (){


  return (
    //flex relative bg-gray-800 h-screen overflow-hidden
<div className='pt-10 bg-black'>
<Main/>
</div>
  )
}



