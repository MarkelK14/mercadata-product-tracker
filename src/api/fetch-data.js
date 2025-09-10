import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const { BASE_API_URL } = process.env;

export const fetchSections = async () => {
    const url = `${BASE_API_URL}/categories/`;
    const { data } = await axios.get(url);
    return data.results;
};

export const fetchProductsByCategory = async (categoryId) => {
    const url = `${BASE_API_URL}/categories/${categoryId}/`;
    const { data } = await axios.get(url);
    return data;
};

export const fetchProductById = async (productId) => {
    const url = `${BASE_API_URL}/products/${productId}/`;
    const { data } = await axios.get(url);
    return data;
};