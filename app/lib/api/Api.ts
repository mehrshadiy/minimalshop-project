import {CategoriesType, ProductsType, ProductType} from "@/app/lib/types/Types";
import api from "@/app/lib/api/ApiConfig";


export const getAllCategories = async () => {
    try {
        const response = await api.get<CategoriesType>('/products/categories')
        return response.data;
    }catch (error) {
        console.error(error);
    }
}

export const getInCategories = async (category: string, limit?: number) => {
    try {
        const response = await api.get<ProductsType>(`/products/category/${category}${limit && limit ?`?limit=${limit}`: ''}`);
        return response.data;
    }catch (error) {
        console.error(error);
    }
}

export const getSingleProduct = (id: number) => {
    try {
        return api.get<ProductType>(`/products/${id}`);
    }catch(error) {
        console.error(error);
    }}

