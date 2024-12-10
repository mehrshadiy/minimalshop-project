// @flow
import * as React from 'react';
import {getInCategories} from "@/app/lib/api/Api";
import {ProductCart} from "@/app/ui/sections/ProductCart";
import Link from "next/link";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Container} from "@/app/ui/sections/Container";


type Props = {
    category: string;
    limit?: number
    link?: boolean
}

export async function CategorySection(props: Props) {

    const products = await getInCategories(props.category, props.limit);

    return (
        <Container className={'py-2 '}>


            <div className={'p-4 border-b-2 border-gray-500 flex justify-between'}>
                <h3 className={'font-bold text-xl '}>
                    {
                        props.category &&
                        props.category
                    }
                </h3>
                {
                    props.link &&
                    <Link href={`/category/${props.category}`}
                          className={'hover:drop-shadow-xl hover:text-gray-500 flex items-center'}>
                        see more
                        <MdKeyboardArrowRight/>
                    </Link>
                }
            </div>

            <div className={'flex flex-wrap gap-2 justify-evenly'}>
                {
                    products &&
                    products.map((product, index) => (
                        <ProductCart product={product} key={index}/>
                    ))
                }
            </div>
        </Container>
    );
}