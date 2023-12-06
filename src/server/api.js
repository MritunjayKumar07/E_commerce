import axios from 'axios';

// 
const BASE_URL = `http://localhost:9000/mirchmasala`;
// const BASE_URL = process.env.REACT_APP_API;

export const getProduct = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
        // console.log(response.data);
    } catch (error) {
        console.log(`Error while calling addUser:`, error);
        throw error;
    }
}