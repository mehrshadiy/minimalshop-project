'use client'

// @flow
import * as React from 'react';
import {RiArrowLeftSLine} from "react-icons/ri";
import {useRouter} from "next/navigation";



export function BackBtn() {

    const router = useRouter();

    const clickHandler = () => {
        router.back()
    }

    return (
        <button className={'flex gap-2 flex-row items-center justify-start mx-auto w-[80vw] border drop-shadow-2xl shadow-2xl p-2 mb-5 mt-16'}
        onClick={()=>clickHandler()}>
            <RiArrowLeftSLine/>
            Back
        </button>
    )
}