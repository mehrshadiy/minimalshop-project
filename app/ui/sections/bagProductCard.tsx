import * as React from 'react';
import {UserCart} from "@/app/lib/types/Types";
import Link from "next/link";
import Image from "next/image";
import {useUser} from "@/app/lib/context/UserContext";
import {CartBtn} from "@/app/ui/btn/CartBtn";

type Props = {
    userCart: UserCart | {
        userId: string;
        products: {
            quantity: number;
            productId: number;
        }[]; };
}


export function BagProductCard({userCart}: Props) {

    const {cartProductsWhitQuantity} = useUser()


    return (

        <ul className="p-4 shadow-2xl drop-shadow-2xl rounded-2xl flex flex-col gap-10 lg:flex-auto flex-wrap">
            {userCart.userId ? (
                <>
                    <li className="text-lg font-bold">Cart id: {userCart.userId}</li>
                    {cartProductsWhitQuantity.map((product, index) => {
                        const displayProduct = cartProductsWhitQuantity.find(
                            (cartProduct) => cartProduct.id === product.id
                        ) || {
                            id: product.id,
                            image: product.image,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            quantity: product.quantity,
                        };

                        return (
                            <li key={index} className="flex flex-col gap-5 items-center">
                                <Link
                                    href={`/products/${displayProduct.id}`}
                                    className="flex flex-col gap-2 md:items-center md:flex-row lg:items-start"
                                >
                                    <Image
                                        src={displayProduct.image}
                                        alt={displayProduct.title}
                                        width={300}
                                        height={400}
                                        className="rounded-xl"
                                    />
                                    <h2 className="text-lg lg:text-2xl font-['Cabin']">
                                        {displayProduct.title}
                                    </h2>
                                </Link>
                                {displayProduct.price} X {displayProduct.quantity} ={" "}
                                {displayProduct.price * displayProduct.quantity}
                                <CartBtn displayProduct={displayProduct}/>
                            </li>
                        );
                    })}
                </>
            ) : null}
        </ul>

    )
}