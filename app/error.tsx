'use client'

// @flow
import * as React from 'react';
import {useEffect} from "react";

type Props = {
    error: Error & {digest: string};
    reset: () => void;
};

export default function Error(props: Props) {

    useEffect(()=>{
        console.log(props.error)
    },[props.error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className={'text-center'}>
                Something went wrong!
            </h2>
            <button className={'mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'}
            onClick={()=>{
                props.reset()
            }}>
                Try again
            </button>
        </main>
    );
}