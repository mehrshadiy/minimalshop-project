'use client'

import {jwtDecode} from "jwt-decode";


import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import api from "@/app/lib/api/ApiConfig";
import {
    LoginFormType,
    LoginResponseType, ProductWithQuantityType,
    RegisterFormType,
    RegisterResponseType, UserCart,
} from "@/app/lib/types/Types";
import {redirect} from "next/navigation";
import {getSingleProduct} from "@/app/lib/api/Api";

type Props = {
    children: ReactNode;
}

type ContextType = {
    user: string | null;
    authLogin: ({username, password}: LoginFormType) => void;
    authRegister: ({email, username, password, name, address, phone}: RegisterFormType) => void
    logout: () => void;
    authStatusCheck: () => boolean;

    cart: userCart;
    cartProductsWhitQuantity: Array<ProductWithQuantityType>

    addToCart: (productId: number)=> void
    removeFromCart: (productId: number) => void
    updateCartItemQuantity: (productId: number,quantity: number)=> void
}

export type userCart = (UserCart | {
    userId: string;
    products: {
        quantity: number;
        productId: number;
    }[];
})[];

const UserContext = createContext<ContextType | null>(null)

export function AuthProvider({children}: Props) {

    const [cookies, setCookie, removeCookie] = useCookies(['UserId']);
    const [user, setUser] = useState<string | null>(null);
    const [cart, setCart] = useState<userCart>([])
    const [cartProductsWhitQuantity, setCartProductsWhitQuantity] = useState<Array<ProductWithQuantityType>>([])

    useEffect(() => {
        const allProducts = cart.flatMap(userCart =>
            userCart.products.map(product => ({ productId: product.productId, quantity: product.quantity }))
        );
        const uniqueProductIds = Array.from(new Set(allProducts.map(product => product.productId)));

        Promise.all(
            uniqueProductIds.map(productId =>
                getSingleProduct(productId)!
                    .then(response => response?.data || null)
                    .catch(error => {
                        console.error(`Error fetching product ${productId}:`, error);
                        return null; // Return null for failed requests
                    })
            )
        ).then(productDetails => {
            const validProducts = productDetails.filter(Boolean); // Exclude null responses
            const updatedProducts: ProductWithQuantityType[] = [];

            allProducts.forEach(product => {
                const productDetail = validProducts.find(detail => detail!.id === product.productId);
                if (productDetail) {
                    const existingProduct = updatedProducts.find(p => p.id === product.productId);
                    if (existingProduct) {
                        existingProduct.quantity += product.quantity;
                    } else {
                        updatedProducts.push({ ...productDetail, quantity: product.quantity });
                    }
                }
            });

            setCartProductsWhitQuantity(updatedProducts);
        });
    }, [cart]);

    console.log('user', user)
    console.log('cart', cart)

    useEffect(() => {
        const userId = cookies.UserId

        if (!userId) {
            return
        }else {
            try {
                const userId = cookies.UserId
                login(userId)
                getUserCarts(userId)

            } catch (errors) {
                console.error('Failed to get the user Id: ', errors)
            }
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const authLogin = ({username, password}: LoginFormType) => {
            api.post<LoginResponseType>('/auth/login', JSON.stringify({
                username: username,
                password: password,
            })).then((response)=>{
                const token = response.data.token
                const decoded = jwtDecode(token)
                const userId = decoded.sub!
                login(userId)
            }).catch(error => {
                console.log(error)
            }).finally(()=>{
                redirect('/')
            })
    }

    const authRegister = ({email, username, password, name, address, phone}: RegisterFormType) => {

             api.post<RegisterResponseType>('/users', JSON.stringify({
                email: email,
                username: username,
                password: password,
                name: {
                    firstname: name.firstname,
                    lastname: name.lastname
                },
                address: {
                    city: address.city,
                    street: address.street,
                    number: address.number,
                    zipcode: address.zipcode,
                    geolocation: {
                        lat: address.geolocation.lat,
                        long: address.geolocation.long
                    }
                },
                phone: phone
            })).then((response)=>{
                 login(response.data.id.toString())
             }).catch(error => {
                 console.error(error)
             }).finally(()=>{
                 redirect('/')
             })
    }

    const login = (userId: string) => {
        if (!cookies.UserId){
            setCookie('UserId', userId, {path: '/'});
        }
        setUser(userId)
    }
    const logout = () => {
        removeCookie('UserId', {path: '/'})
        setUser(null)
    }
    const authStatusCheck = () => {
        return user !== null;
    }


    const getUserCarts = (userId: string) => {
         api.get<UserCart[]>(`/carts/user/${userId}`).then((response)=>{
             console.log('getUserCarts response', response.data)
             setCart(response.data);
         }).catch((error)=>{
             console.error(error)
         }).finally(()=>{

         })
    }

    const addToCart = (productId: number) => {
        console.log('addToCart', productId);

        if (!user) {
            console.error("User not logged in");
            return;
        }

        console.log('addToCart', productId);

        const existingCartItem = cart.flatMap(c => c.products).find(item => item.productId === productId);
        const newCartItem = existingCartItem
            ? { ...existingCartItem, quantity: existingCartItem.quantity + 1 }
            : { productId, quantity: 1 };

        const updatedCart = existingCartItem
            ? cart.map(userCart => ({
                ...userCart,
                products: userCart.products.map(item =>
                    item.productId === productId ? newCartItem : item
                ),
            }))
            : [...cart, { userId: user, products: [newCartItem] }];

        api.post(`/carts`, JSON.stringify({
            userId: user,
            date: new Date().toISOString(),
            products: updatedCart.flatMap(c => c.products),
        }))
            .then(() => {
                setCart(updatedCart);
            })
            .catch(error => {
                console.error("Error adding to cart:", error);
            });
    };

    const removeFromCart = (productId: number) => {
        const updatedCart = cart.map(userCart => ({
            ...userCart,
            products: userCart.products.filter(item => item.productId !== productId),
        }));

        api.put(`/carts/${user}`, JSON.stringify({
            userId: user,
            date: new Date().toISOString(),
            products: updatedCart.flatMap(c => c.products),
        }))
            .then(() => {
                setCart(updatedCart);
            })
            .catch((error) => {
                console.error('Error removing from cart:', error);
            });
    };


    function updateCartItemQuantity(productId: number, newQuantity: number) {
        setCartProductsWhitQuantity((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(newQuantity, 0) } // Ensure quantity stays non-negative
                    : item
            )
        );
    }


    return (
        <UserContext.Provider value={{user, authLogin, authRegister, logout, authStatusCheck, cart, cartProductsWhitQuantity, addToCart, removeFromCart, updateCartItemQuantity}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
}