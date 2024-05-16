import axios from 'axios';
import { baseAPI } from '../services/url';
import { Product } from '../class/product';
export async function buscaProducts(page) {
    try {
        const response = await axios.get(`${baseAPI}/products?page=${page}&rows=8&sortBy=id&orderBy=ASC`);
        if (response.status == 200) {
            const data = response.data.products;
            return data.map((item) => Product(item));
        } else {
            return false;
        }
    } catch (error) {
        if (error.response.status == 400) {
            throw new Error(`${error.response.data.message}`);
        } else {
            throw new Error(`${error}`);
        }
    }
}
