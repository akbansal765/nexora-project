import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const BACKEND_SERVER = 'http://localhost:5000';

export const addCartItemDB = createAsyncThunk("addCartItemDB", async (item, thunkAPI) => {
    try{
        const userEmail = JSON.parse(localStorage.getItem("nexoraUser"))?.email || "";
        const response = await fetch(`${BACKEND_SERVER}/cart?email=${userEmail}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            return thunkAPI.rejectWithValue("Failed to add to cart");
        }
        return response.json();
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const deleteCartItemDB = createAsyncThunk("deleteCartItemDB", async (id, thunkAPI) => {
    try{
        const userEmail = JSON.parse(localStorage.getItem("nexoraUser"))?.email || "";
        const response = await fetch(`${BACKEND_SERVER}/cart/${id}?email=${userEmail}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            return thunkAPI.rejectWithValue("Failed to delete the cart item");
        }
        return response.json();
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const updateCartItemDB = createAsyncThunk("updateCartItemDB", async ({id, quantity}, thunkAPI) => {
    try{
        const userEmail = JSON.parse(localStorage.getItem("nexoraUser"))?.email || "";
        const response = await fetch(`${BACKEND_SERVER}/cart/${id}?email=${userEmail}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({quantity})
        });
        if (!response.ok) {
            return thunkAPI.rejectWithValue("Failed to update the quantity");
        }
        return response.json();
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const getCartItemsDB = createAsyncThunk("getCartItemsDB", async (_, thunkAPI) => {
    try{
        const userEmail = JSON.parse(localStorage.getItem("nexoraUser"))?.email || "";
        const response = await fetch(`${BACKEND_SERVER}/cartItems?email=${userEmail}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `JWT ${JSON.parse(localStorage.getItem("nexoraUser")).accessToken}`
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "Failed to get cart items!");
        }
        return data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        error: ""
    },
    reducers: {
        addItem : (state, action) => {
            //add quantity property to new cart item object
            
            //if cart item already exists in the items/cart then take the existing quantity and add 1 more
            const alreadyExistingItem = state.items.find(obj => obj.id == action.payload.id);
              if(alreadyExistingItem){
                 alreadyExistingItem.quantity = alreadyExistingItem.quantity + 1;
              }else{
                 // add the quantity 1 if item does not already exists in the cart/items state
                //  console.log(Object.isExtensible(action.payload));
                 const item = {...action.payload, quantity: 1}
                 state.items.push(item);
              }          
        },
        calculateTotalQuantity: (state) => {
            // this function should be called everytime when item is added to cart
            
                //calculating total quantity using quanity property in each object
                const totalCartItems = state?.items?.reduce((acc, cur) => {
                acc = acc + cur.quantity;
                return acc;
                }, 0)

                state.totalQuantity = totalCartItems;
        },
        increaseQuantity: (state, action) => {
            //increase the quantity of the cartitem in items state
            const itemToBeIncrease = state.items.find(item => item.id == action.payload.id);
            itemToBeIncrease.quantity = itemToBeIncrease.quantity + 1;

            //increase the quanity of the cartitem in totalQuantity state
            state.totalQuantity++;

        },
        decreaseQuantity: (state, action) => {
            //decrease the quantity of the cartitem in items state
            const itemToBeDecrease = state.items.find(item => item.id == action.payload.id);
            itemToBeDecrease.quantity = itemToBeDecrease.quantity - 1;

            //decrease the quanity of the cartitem in totalQuantity state
            state.totalQuantity--;
        },
        removeItem: (state, action) => {
            //find the index of the item to be removed
            const itemToBeRemoved = state.items.findIndex(item => item.id == action.payload.id);
            //remove the item from the state
            state.items.splice(itemToBeRemoved, 1);

            //call the calculateTotalQuantity reducer func again when pressing the remove button
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCartItemDB.pending, (state) => {
        })
        .addCase(addCartItemDB.fulfilled, (state, action) => {
        })
        .addCase(addCartItemDB.rejected, (state) => {
        });

        builder
        .addCase(deleteCartItemDB.pending, (state) => {
        })
        .addCase(deleteCartItemDB.fulfilled, (state, action) => {
        })
        .addCase(deleteCartItemDB.rejected, (state) => {
        });

        builder
        .addCase(updateCartItemDB.pending, (state) => {
        })
        .addCase(updateCartItemDB.fulfilled, (state, action) => {
        })
        .addCase(updateCartItemDB.rejected, (state) => {
        });

        builder
        .addCase(getCartItemsDB.pending, (state) => {
        })
        .addCase(getCartItemsDB.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = "";

            // again calculating total items in cart after the page reloads and get items from database
            const totalCartItems = action.payload.reduce((acc, cur) => {
                acc = acc + cur.quantity;
                return acc;
            }, 0)

            state.totalQuantity = totalCartItems;
        })
        .addCase(getCartItemsDB.rejected, (state, action) => {
            state.error = action.payload;
            //when user logout or unable to fetch cart items make the state zero
            state.totalQuantity = 0;
            state.items = [];
        });
    }
});

export const {addItem, calculateTotalQuantity, increaseQuantity, decreaseQuantity, removeItem} = cartSlice.actions;
export default cartSlice.reducer;