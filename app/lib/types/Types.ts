
export type CategoriesType = Array<CategoryType>

export type CategoryType = "electronics" | "jewelery" | "men's clothing" | "women's clothing"

export type ProductsType = Array<ProductType>

export type ProductType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: CategoryType,
    image: string,
    rating: {
        rate: number,
        count: number,
    }
}
export type ProductWithQuantityType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: CategoryType,
    image: string,
    rating: {
        rate: number,
        count: number,
    },
    quantity: number
}
export type LoginFormType = {
    username: string;
    password: string;
}

export type LoginResponseType = {
    token: string
}

export type RegisterFormType = {
    email: string,
    username:string,
    password:string,
    name:{
        firstname:string,
        lastname:string
    },
    address:{
        city:string,
        street:string,
        number:number,
        zipcode:string,
        geolocation:{
            lat:string,
            long:string
        }
    },
    phone:string
}

export type RegisterResponseType = {
    id:number,
    email:string,
    username:string,
    password:string,
    name:{
        firstname:string,
        lastname:string
    },
    address:{
        city:string,
        street:string,
        number:number,
        zipcode:string,
        geolocation:{
            lat:string,
            long:string
        }
    },
    phone:string
}

export type UserCart = {
    id:number,
    userId:number,
    date:string,
    products: Array<CartProduct>
}

export type CartProduct = {
    productId:number,
    quantity:number
}

export type DisplayProduct = {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    quantity?: number;
};
