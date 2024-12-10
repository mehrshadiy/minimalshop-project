'use client'

import {useUser} from "@/app/lib/context/UserContext";
import {BagProductCard} from "@/app/ui/sections/bagProductCard";

const  BagPage = () => {

    const {cart} = useUser();



    return (
        <div className={`container mx-auto max-w-[80vw] lg:max-w-[50vw]`}>
            <h1 className={'text-3xl font-bold mb-2 font-[\'Cabin\'] text-center mx-auto'}>
                Your Bag
            </h1>
            {
                cart.map((cartItem, index) => {
                    return (
                            <BagProductCard userCart={cartItem} key={index}/>
                        )
                })
            }
        </div>
    );
};

export default BagPage;