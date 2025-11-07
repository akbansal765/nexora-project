import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_SERVER = 'http://localhost:5000';

export const fetchProductData = createAsyncThunk("productData", async (_, thunkAPI) => {
    try{
        const response = await fetch(`${BACKEND_SERVER}/products`);
        const data = await response.json();
        
        if(!response.ok){
            throw new Error(data.message || `Server responded with ${response.status}`);
        }
        return data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const fetchProductByID = createAsyncThunk("product", async (productId, thunkAPI) => {
    try{
        const response = await fetch(`${BACKEND_SERVER}/product/${productId}`);
        if(!response.ok){
            throw new Error(`Server responded with ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

const productDataSlice = createSlice({
    name: "productDataSlice",
    initialState : {
        data: [],
        product: null,
        loading: false,
        error: ""
    },
    extraReducers : (builder) => {
        // fetch all products
        builder
        .addCase(fetchProductData.pending, (state) => {
           state.loading = true;
        })
        .addCase(fetchProductData.fulfilled, (state, action) => {
           state.data = action.payload;
           state.loading = false;
           state.error = "";
        })
        .addCase(fetchProductData.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // fetch product by id
        builder
        .addCase(fetchProductByID.pending, (state) => {
           state.loading = true;
        })
        .addCase(fetchProductByID.fulfilled, (state, action) => {
           state.product = action.payload;
           state.loading = false;
        })
        .addCase(fetchProductByID.rejected, (state) => {
            state.loading = false;
        });
    }
})

export default productDataSlice.reducer;