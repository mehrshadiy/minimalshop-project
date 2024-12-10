'use client';

import * as React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/app/lib/types/Types";
import { useUser } from "@/app/lib/context/UserContext";
import { CartBtn } from "@/app/ui/btn/CartBtn";
import {getDisplayProduct} from "@/app/lib/api/productHelpers";

type Props = {
    product: ProductType;
};

export function ProductCart({ product }: Props) {
    const { cartProductsWhitQuantity } = useUser();
    const displayProduct = getDisplayProduct(product, cartProductsWhitQuantity);

    return (
        <div className="p-4 flex flex-col justify-center items-center gap-2 w-fit max-w-sm shadow-2xl drop-shadow-xl rounded-2xl h-min">
            <Link href={`/products/${displayProduct.id}`} className="flex items-center flex-col">
                <div className="p-4 bg-white rounded-3xl w-fit mb-4">
                    <Image src={displayProduct.image} alt={displayProduct.title} width={159} height={200} />
                </div>
                <div className="p-2 flex-col justify-center items-start gap-2 flex w-full">
                    <h4 className="text-[#1a1f16] text-lg text-balance font-medium font-['Cabin']">
                        {displayProduct.title}
                    </h4>
                </div>
            </Link>
            <div className="p-4 flex justify-between items-center gap-10 w-full">
                <span className="text-[#1a1f16] text-xl font-medium font-['Cabin'] text-nowrap">
                    $ {displayProduct.price}
                </span>
                <CartBtn displayProduct={displayProduct} />
            </div>
        </div>
    );
}
