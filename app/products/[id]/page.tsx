'use client'

import { useEffect, useState } from 'react';
import { BackBtn } from "@/app/ui/btn/BackBtn";
import { getSingleProduct } from "@/app/lib/api/Api";
import Image from "next/image";
import { Rating } from "@/app/ui/rating/Rating";
import Link from "next/link";
import { Container } from "@/app/ui/sections/Container";
import { useUser } from "@/app/lib/context/UserContext";
import { ProductType } from "@/app/lib/types/Types";
import { CartBtn } from "@/app/ui/btn/CartBtn";

type Props = {
    params: Promise<{
        id: string
    }>
};
export default function Page(props: Props) {
    const { cartProductsWhitQuantity } = useUser();
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const params = await props.params
                const id = params.id // Access id directly from params
                const response = await getSingleProduct(Number(id));
                setProduct(response!.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        }

        fetchData();
    }, [props]);

    const productInCart = cartProductsWhitQuantity.find(
        cartProduct => cartProduct.id === product?.id
    );

    const displayProduct = productInCart || product;

    if (!product) {
        return <div>Loading...</div>; // Show a loading message until product is fetched
    }

    return (
        <Container className={'py-12 px-6'}>
            <BackBtn />
            <div className={'flex flex-wrap gap-6 border-b-2 border-[#1a1f16]/50 pb-6 mb-4'}>
                <Image className="img w-60 h-72 rounded-xl" src={`${displayProduct?.image}`} width={242} height={302} alt={displayProduct!.title} />
                <div>
                    <h1 className={'text-xl font-bold mb-2 font-[\'Cabin\']'}>
                        {displayProduct?.title}
                    </h1>

                    <Rating rate={displayProduct?.rating.rate} />
                    <span className="text-[#1a1f16] text-2xl font-medium font-['Cabin']">
                        $ {displayProduct?.price}
                    </span>
                    <Link href={`/category/${displayProduct?.category}`} className="text-[#1a1f16] text-xl font-normal font-['Cabin'] p-2 text-start block w-fit gap-2 flex-row items-center justify-start drop-shadow-2xl shadow-2xl mb-5 rounded-2xl">
                        {displayProduct?.category}
                    </Link>
                    <CartBtn displayProduct={displayProduct!} />
                </div>
            </div>
            <div className={'py-4 px-2'}>
                <h3 className={'text-[#1a1f16] text-3xl font-medium font-[\'Cabin\'] mb-2'}>
                    Description
                </h3>
                <p className={'text-[#60695c] text-md font-normal font-[\'Cabin\']'}>
                    {displayProduct?.description}
                </p>
            </div>
        </Container>
    );
}