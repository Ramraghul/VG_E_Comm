import axios from 'axios';
import { categoryItemsView, clearCart, getCategories, getCategoryItems, orderList } from '../reducers/reducer';

// Function to calculate response time
const calculateResponseTime = (start) => {
    const end = new Date();
    const duration = end.getTime() - start.getTime();
    return duration;
};

//API Actions
//Fetch All Categories
export const fetchCategories = () => {
    return async (dispatch) => {
        const startTime = new Date();
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/getProductCategory`);
            const responseTime = calculateResponseTime(startTime);
            console.log(`Response time for fetchCategories: ${responseTime}ms`);
            dispatch(getCategories(response.data.data))
        } catch (error) {
            console.error(error.message);
        }
    };
};

//Fetch Categories Wise Items
export const fetchCategoryItems = (category) => {
    return async (dispatch) => {
        const startTime = new Date();
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/getProductCategoryWise?categories=${category}`);
            const responseTime = calculateResponseTime(startTime);
            console.log(`Response time for fetchCategoryItems: ${responseTime}ms`);
            dispatch(getCategoryItems(response.data.data));
        } catch (error) {
            console.error(error.message);
        }
    };
};

//Fetch Categories Item Id Wise
export const fetchCategoryItemsById = (id) => {
    return async (dispatch) => {
        const startTime = new Date();
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/getProductById?productId=${id}`);
            const responseTime = calculateResponseTime(startTime);
            console.log(`Response time for fetchCategoryItemsById: ${responseTime}ms`);
            dispatch(categoryItemsView(response.data.data[0]))
        } catch (error) {
            console.error(error.message);
        }
    };
};

export const placeOrder = (Order) => {
    return async (dispatch) => {
        const startTime = new Date();
        try {
            await axios.post(`http://localhost:9000/api/v1/placeOrder`, Order);
            dispatch(clearCart())
            const responseTime = calculateResponseTime(startTime);
            console.log(`Response time for fetchAllOrder: ${responseTime}ms`);
        } catch (error) {
            console.error(error.message);
        }
    };
};

//Fetch Categories Item Id Wise
export const fetchAllOrder = () => {
    return async (dispatch) => {
        const startTime = new Date();
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/getOrderList`);
            console.log(response.data.data);
            dispatch(orderList(response.data.data))
            const responseTime = calculateResponseTime(startTime);
            console.log(`Response time for fetchAllOrder: ${responseTime}ms`);
        } catch (error) {
            console.error(error.message);
        }
    };
};
