import { loginInterface, signUpInterface, userData } from "@/Interfaces/Interfaces";
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface UserState {
    token: string | null;
    user: null | userData;
    isLoading: boolean;
    error: string | null; // Add error field
  }

  interface UserResponse {
    token: string;
    user: object; // Refine this if you know the user structure
  }


export const addUser = createAsyncThunk<UserResponse, signUpInterface>("user/addUser", async (values, { rejectWithValue }) => {
    try{
        const res  = await fetch("https://linked-posts.routemisr.com/users/signup", {method: "POST", body:JSON.stringify(values),
            headers:{
                "Content-Type" : "application/json"
            }
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Signup failed"); // Use API error message
          }
          return data;
    } catch (err) {
        // Properly reject with the error message
        return rejectWithValue((err as Error).message);
      }
})

export const loginUser = createAsyncThunk<UserResponse, loginInterface>("user/loginUser", async (values , {rejectWithValue}) => {
    try{
       const res = await fetch("https://linked-posts.routemisr.com/users/signin", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
        
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      return data; // { token, user }
    }catch (err) {
        return rejectWithValue((err as Error).message);
      }
});

export const getUserData = createAsyncThunk<userData, string>("user/getUserData", async (token: string, {rejectWithValue})=>{
    try{
        const res = await fetch("https://linked-posts.routemisr.com/users/profile-data", {
            method: "GET",
            headers:{
                token,
            }
        });

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || "Login failed"); // Use API error message
          }
        return data.user;
    } catch(err){
        return rejectWithValue((err as Error).message);
    }
})


const initialState:UserState = {
    token: null,
    user:null,
    isLoading: false,
    error: null,
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null; // Optional: Clear error manually
          },
    },
    extraReducers: (builder) => {
        // add user
        builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Payload is string from rejectWithValue
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token; 
      });

    //   login user
      builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Payload is string from rejectWithValue
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      });

      // get user data
      builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Payload is string from rejectWithValue
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;        
        state.user = action.payload; 
        localStorage.setItem("user", JSON.stringify(action.payload))

      })
    }
})

export const { clearError } = userSlice.actions;
export const userReducer = userSlice.reducer;


