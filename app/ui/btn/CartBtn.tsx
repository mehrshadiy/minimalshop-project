// 'use client';
//
// import * as React from 'react';
// import { IoBagAdd } from "react-icons/io5";
// import { IoMdAdd, IoMdRemove } from "react-icons/io";
// import { DisplayProduct } from "@/app/lib/types/Types";
// import { useUser } from "@/app/lib/context/UserContext";
//
// type Props = {
//     displayProduct: DisplayProduct;
// };
//
//
// export function CartBtn({ displayProduct }: Props) {
//     const { addToCart, removeFromCart, updateCartItemQuantity } = useUser();
//
//     const addCartHandler = () => {
//         addToCart(displayProduct.id || 0);
//     };
//
//     if (displayProduct.quantity && displayProduct.quantity > 0) {
//         // If the product is in the cart, show quantity controls
//         return (
//             <div className={'flex flex-row gap-5 items-center text-xl'}>
//
//                 <button
//                     onClick={() =>
//                         updateCartItemQuantity(displayProduct.id, Math.max(displayProduct.quantity - 1, 0))
//                     }
//                 >
//                     <IoMdRemove size={20} color={'red'}/>
//                 </button>
//
//
//                 <span>{displayProduct.quantity}</span>
//                 <button
//                     onClick={() =>
//                         updateCartItemQuantity(displayProduct.id, displayProduct.quantity + 1)
//                     }
//                 >
//                     <IoMdAdd size={20} color="green"/>
//                 </button>
//             </div>
//         );
//     } else {
//         // If not in the cart, show "Add to Cart"
//         return (
//             <button
//                 onClick={() => addCartHandler()}
//                 className="Button p-2 bg-[#1a1f16] rounded-[9px]"
//             >
//                 <IoBagAdd color={'white'} size={15} />
//             </button>
//         );
//     }
// }

'use client';

import * as React from 'react';
import { IoBagAdd } from "react-icons/io5";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { DisplayProduct } from "@/app/lib/types/Types";
import { useUser } from "@/app/lib/context/UserContext";

type Props = {
    displayProduct: DisplayProduct;
};

export function CartBtn({ displayProduct }: Props) {
    const { addToCart, removeFromCart, updateCartItemQuantity, cartProductsWhitQuantity } = useUser();

    // Check if the product is already in the cart
    const productInCart = cartProductsWhitQuantity.find(
        (cartProduct) => cartProduct.id === displayProduct.id
    );

    const handleAddToCart = () => addToCart(displayProduct.id);
    const handleIncreaseQuantity = () => {
        if (productInCart) {
            updateCartItemQuantity(productInCart.id, productInCart.quantity + 1);
        }
    };
    const handleDecreaseQuantity = () => {
        if (productInCart!.quantity > 1) {
            updateCartItemQuantity(productInCart!.id, productInCart!.quantity - 1);
        } else if (productInCart) {
            removeFromCart(productInCart.id);
        }
    };

    if (productInCart) {
        // If the product is in the cart, show quantity controls
        return (
            <div className="flex flex-row gap-5 items-center text-xl">
                <button onClick={handleDecreaseQuantity}>
                    <IoMdRemove size={20} color="red" />
                </button>
                <span>{productInCart.quantity}</span>
                <button onClick={handleIncreaseQuantity}>
                    <IoMdAdd size={20} color="green" />
                </button>
            </div>
        );
    } else {
        // If the product is not in the cart, show "Add to Cart"
        return (
            <button
                onClick={handleAddToCart}
                className="Button p-2 bg-[#1a1f16] rounded-[9px]"
            >
                <IoBagAdd color="white" size={15} />
            </button>
        );
    }
}