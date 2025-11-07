import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_SERVER = 'http://localhost:5000';


export const registerUser = createAsyncThunk("registerUser", async (user, thunkAPI) => {
    try{
        const response = await fetch(`${BACKEND_SERVER}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "Failed to register user");
        }
        return data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const loginUser = createAsyncThunk("loginUser", async (user, thunkAPI) => {
    try{
        const response = await fetch(`${BACKEND_SERVER}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "Failed to login");
        }
        return data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState : {
        isLogin: JSON.parse(localStorage.getItem("nexoraUserLoginStatus")) || false,
        isUserRegistered: false,
    },
    reducers: {
        logoutUser: (state, _) => {
            localStorage.removeItem("nexoraUser");
            localStorage.removeItem("nexoraUserLoginStatus");
            state.isLogin = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isUserRegistered = true;
        })
        .addCase(registerUser.rejected, (state, action) => {
            console.log(action.payload);
        });

        builder
        .addCase(loginUser.pending, (state) => {
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            //saving user information to local storage once user is logged in
            localStorage.setItem("nexoraUser", JSON.stringify(action.payload));

            state.isLogin = true;

            localStorage.setItem("nexoraUserLoginStatus", JSON.stringify(true));
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.log(action.payload);
        });
    }
});

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;