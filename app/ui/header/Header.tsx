'use client'
import {LuSquareMenu} from "react-icons/lu";
import React, {useState} from "react";
import {Navbar} from "@/app/ui/header/Navbar";

export function Header() {

    const [navShow, setNavShow] = useState(false)


    return (
            <header className={`${navShow? 'h-[96vh]' : 'h-fit md:h-[96vh]' } fixed top-[2vh] left-[1vh] w-fit p-2 bg-white rounded-lg items-center`}>
                <Navbar navShow={navShow} setNavShow={setNavShow}/>
                <button onClick={() => setNavShow(true)} className={`${navShow ? "hidden" : "block md:hidden"}`}>
                    <LuSquareMenu color={'black'} size={32}/>
                </button>
            </header>
    );
}