// @flow
import * as React from 'react';
import {FaRegStar, FaStar} from "react-icons/fa";
import {FaRegStarHalfStroke} from "react-icons/fa6";

type Props = {
    rate: number|undefined
};

export function Rating(props: Props) {


    const stars = Array.from({ length: 5 }, (_, i) => {
        if (props.rate! >= i+1) return (
            <li key={i}>
            <FaStar size={15} color={'green'}/>
        </li>
        )
        if (props.rate! > i) return (
            <li key={i}>
                <FaRegStarHalfStroke  size={15} color={'green'}/>
            </li>
        )
        return (
            <li key={i}>
                <FaRegStar  size={15} color={'green'}/>
            </li>
        )
    });




        return (
        <ul className={'flex flex-row gap-2 items-center py-4 px-2'}>
            {
                stars.map((item) => {
                    return (item)
                })
            }
            <li>
                <span className={'text-[#12805d] text-md font-normal font-[\'Cabin\']'}>
                    {props.rate} / 5
                </span>
            </li>
        </ul>
    );
}