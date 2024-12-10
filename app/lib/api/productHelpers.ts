import { ProductType, DisplayProduct } from "@/app/lib/types/Types";

export function getDisplayProduct(product: ProductType, cartProducts: DisplayProduct[]): DisplayProduct {
    const productInCart = cartProducts.find(cartProduct => cartProduct.id === product.id);
    return productInCart || { ...product, quantity: 1 }; // Default to quantity 1 if not in cart
}
