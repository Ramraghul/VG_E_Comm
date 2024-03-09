import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    categoryItems: [],
    description: {},
    cart: [],
    orderList: [],
    loading: true,
};

const productReducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        },
        getCategoryItems: (state, action) => {
            state.categoryItems = action.payload;
            state.loading = false;
        },
        categoryItemsView: (state, action) => {
            state.description = action.payload;
            state.loading = false;
        },
        addCartItem: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);
            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex].quantity += 1;
            } else {
                state.cart.push({ ...newItem, quantity: 1 });
            }
            state.loading = false;
        },
        updateCartItemQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const itemToUpdate = state.cart.find(item => item.id === itemId);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
        removeCartItem: (state, action) => {
            const itemIdToRemove = action.payload;
            const updatedCart = state.cart.filter(item => item.id !== itemIdToRemove.id);
            return {
                ...state,
                cart: updatedCart,
                loading: false
            };
        },
        clearCart: (state) => {
            state.cart = [];
        },
        orderList: (state, action) => {
            state.orderList = action.payload;
            state.loading = false;
        }
    },
});

export const { getCategories, getCategoryItems, categoryItemsView, setLoading, addCartItem, updateCartItemQuantity, removeCartItem, clearCart, orderList } = productReducer.actions;

export default productReducer.reducer;
