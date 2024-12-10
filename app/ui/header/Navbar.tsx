'use client'

import * as React from 'react';
import {IoClose} from "react-icons/io5";
import Image from "next/image";
import {GiShop} from "react-icons/gi";
import {RiShoppingBag4Fill} from "react-icons/ri";
import {Dispatch, SetStateAction, useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {AuthBtn} from "@/app/ui/auth/AuthBtn";

type Props = {
    navShow: boolean;
    setNavShow:  Dispatch<SetStateAction<boolean>>
};

export function Navbar(props: Props) {

    useEffect(()=>{

    },[])



    const pathname = usePathname();

    return (
        <nav className={`${props.navShow ? "flex" : "hidden md:flex"} flex-col justify-between items-center h-full w-full`}>

            <ul className={'flex flex-col gap-8 items-center p-2'}>
                <li className={'md:hidden'}>
                    <button>
                        <IoClose color={'red'} size={20}
                                 onClick={() => props.setNavShow(false)}/>
                    </button>
                </li>
                <li>
                    <Image src={'/Logo.svg'} alt={'LOGO'} width={16} height={21} title={'LOGO'}/>
                </li>
                <li>
                    <Link href={'/'} >
                        <GiShop size={40} color={`${pathname == '/' ? 'white' : 'black'}`} className={`${pathname == '/' ? 'bg-black' : 'bg-transparent'} p-2 rounded-lg`}/>
                    </Link>
                </li>
                <li>
                    <Link href={'/products/bag'}>
                        <RiShoppingBag4Fill size={40} color={`${pathname == '/products/bag' ? 'white' : 'black'}`} className={`${pathname == '/products/bag' ? 'bg-black' : 'bg-transparent'} p-2 rounded-lg`}/>
                    </Link>
                </li>
            </ul>
            <AuthBtn/>
        </nav>
    );
}