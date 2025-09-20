import axios from "axios";
import dotenv from 'dotenv';
import dateUtils from '../utils/date.utils.js';

dotenv.config();

const { BASE_API_URL } = process.env;

export const fetchSections = async () => {
    try {
        const url = `${BASE_API_URL}/categories/`;
        const { data } = await axios.get(url);
        return data.results;
    } catch (error) {
        console.error(`[${dateUtils.getDateTimeString()}] ❌ Error fetching sections:`, error.message);
        throw error;
    }
};

export const fetchProductsByCategory = async (categoryId) => {
    try {
        const url = `${BASE_API_URL}/categories/${categoryId}/`;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`[${dateUtils.getDateTimeString()}] ❌ Error fetching products for category ${categoryId}:`, error.message);
        throw error;
    }
};

export const fetchProductById = async (productId) => {
    try {
        const url = `${BASE_API_URL}/products/${Number(productId)}/`;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`[${dateUtils.getDateTimeString()}] ❌ Error fetching product with ID ${Number(productId)}:`, error.message);
        throw error;
    }
};