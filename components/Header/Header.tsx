import { useConnect } from 'wagmi';
import { useTheme } from "next-themes"
import { ExampleButton } from './connect';
import { Popover, Transition } from '@headlessui/react'
import logo from "../../public/logo.webp"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {SocialItem} from "./config"
export function Header() {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    const Header = [
        {
            id: 0,
            name: "Home",
            link: "/",
        }, {
            id: 0,
            name: "info",
            link: "/info",
            islink: true,
        }, {
            id: 0,
            name: "Buy",
            link: "",
        },
        {
            id: 0,
            name: "Bscscan",
            link: "",

        },

    ]


    useEffect(() => {
        setIsMounted(true);
    }, []);
    const ChangeToDarkMood = () => {
        if (isMounted) {
            setTheme(theme === "light" ? "dark" : "light");
        }
    }












    return (
        <Popover className=" bg-[#690082]  sticky top-[0px] w-full h-[80px]">
            <div className=' bg-opacity-[75%] dark:border-secondary-dark transform backdrop-blur-md text-black dark:text-white z-50 sticky top-[0px] w-full h-[80px] px-6 md:px-10 flex items-center justify-between'>

                <div className="cursor-pointer flex justify-center items-center">
                    {/* logo */}
                    <LazyLoadImage
                        src={logo.src}
                        width={30}
                        alt="Solanart"
                        className="hidden dark:block  cursor-pointer"
                        height={30} />
                    <LazyLoadImage
                        src={logo.src}
                        alt="Solanart"
                        className="dark:hidden cursor-pointer"
                        height={30}
                        width={30}
                    />
                    <div className="text-xl font-bold font-[Nexa] ml-2 text-white">NTC</div>
                </div>
                {/* logo */}

                {/* ul */}
                <div className='hidden lg:flex items-center gap-x-8'>
                <div className='flex flex-row gap-2'>
                    {/* social icon... */}
                    {SocialItem?.map((el,indx)=>{
                        return (
                            <a key={indx} className='bg-black p-2 rounded-full' href={el.link} target="_blank" rel="noopener noreferrer">

                                <el.icon className='text-white'></el.icon>
                            </a>)
                    })}
                </div>
                    <ul className="flex gap-2 font-semibold whitespace-nowrap">

                        {
                            Header.map((e, index) => {
                                return (
                                    <li key={index}>
                                        {!e.islink && <a target='_blank' rel="noreferrer" className="relative text-slate-50 flex items-center gap-2 cursor-pointer rounded dark:hover:bg-secondary-dark hover:bg-gray-100 dark:hover:bg-slate-800 p-4 transition-all"
                                            href={`${e.link}`}>
                                            <span>{e.name}</span>
                                        </a>}


                                    </li>

                                )
                            })
                        }
                    </ul>
                    {/* ul */}

                    {/* button */}
                    <div className="flex items-center gap-5 ">
                
                        <ExampleButton />
                    </div>
                </div>

        

                {/* button */}

                {/* mobile manu */}

                <div className='flex flex-row items-center gap-x-2 lg:hidden'>
                    <ExampleButton />
                    <Popover.Button>
                        <div className='flex flex-row gap-x-2'>

                            <div className='cursor-pointer p-2 text-white hover:bg-[#252424] rounded-lg dark:hover:bg-slate-800'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                </svg>

                            </div>

                        </div>
                    </Popover.Button>
                    <Transition
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Popover.Panel
                            className="absolute z-20 inset-0 top-[80px] bg-white dark:bg-primary-dark 	">
                            <div className="flex flex-col items-start bg-white w-full dark:bg-[#1c1b22] dark:rounded-lg pt-2">
                                {
                                    Header && Header.map((e, index) => {
                                        return <>
                                            <a target='_blank' rel="noreferrer" className="w-full relative flex items-center gap-2 cursor-pointer rounded dark:hover:bg-secondary-dark hover:bg-gray-100 dark:hover:bg-slate-800 p-4 transition-all"
                                                href={`${e.link}`}>
                                                <span>{e.name}</span>
                                            </a>
                                        </>


                                    })
                                }




                                <div className="flex items-center gap-4 p-4">
                                
                                    <div className='flex flex-row gap-2'>
                    {/* social icon... */}
                    {SocialItem?.map((el,indx)=>{
                        return (
                            <a key={indx} className='bg-black p-2 rounded-full' href={el.link} target="_blank" rel="noopener noreferrer">

                                <el.icon className='text-white'></el.icon>
                            </a>)
                    })}
                </div>
                                </div>
                            </div>


                        </Popover.Panel>
                    </Transition>

                </div>

                {/* mobile manu */}

            </div>
        </Popover>
    )
}
