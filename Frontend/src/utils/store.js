import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import productReducer from './productDataSlice';
import userReducer from './userSlice';

const appStore = configureStore({
    reducer : {
        cart : cartReducer,
        products: productReducer,
        users: userReducer
    }
})

export default appStore;