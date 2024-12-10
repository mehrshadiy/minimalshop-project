// @flow
import * as React from 'react';
import {ReactNode} from "react";

type Props = {
    label?: string;
    id?: string;
    inputType?: React.HTMLInputTypeAttribute | undefined;
    children?: ReactNode;
    more?: React.InputHTMLAttributes<HTMLInputElement>
    value?: string
    buttonType?: "button" | "reset" | "submit" | undefined
    buttonValue?: string
    buttonClick?: () => void
}


export function AuthFormInput({label, id, inputType, children, more, buttonType, buttonValue, buttonClick}: Props) {

    if (inputType != undefined){
        return (
            <div className={'flex flex-col gap-4 md:gap-3'}>
                <div className={'flex flex-col md:flex-row gap-2 md:gap-4 items-center'}>
                    <label htmlFor={`${id}`}>
                        {label}
                    </label>
                    <input
                        className={'bg-gray-500 text-gray-200 focus:outline-none p-2 rounded-lg'}
                        type={`${inputType}`}
                        id={`${id}`}
                        {...more}
                    />
                </div>
                {children}
            </div>
        )
    }

    return (
        <button
            className={'bg-gray-500 text-gray-200 p-4 text-lg rounded-lg w-fit mx-auto'}
            type={buttonType}
            onClick={buttonClick}
        >
            {buttonValue}
        </button>
    )
}