// @flow
import * as React from 'react';
import {IoEnter, IoExit} from "react-icons/io5";
import {useUser} from "@/app/lib/context/UserContext";
import {redirect} from "next/navigation";


export function AuthBtn() {

    const {logout, user} = useUser()

    return (
        <>
            {
                user ?
                    <button
                        onClick={() => {
                            logout()
                        }}>
                        <IoExit size={32} color={'white'} className={'p-2 rounded bg-red-500'} title={'logout'}/>
                    </button>
                    :
                    <button onClick={() => {
                        redirect('/auth/login')
                    }}>
                        <IoEnter size={32} color={'white'} className={'p-2 rounded bg-green-500'} title={'login'}/>
                    </button>
            }
        </>
    )
}