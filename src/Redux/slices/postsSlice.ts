import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface postData {
    _id:string,
    body:string,
    image:string,
    user: user,
    createdAt: string,
    comments?:(CommentsEntity)[] | null 
}

interface user {
_id:string,
name: string,
photo:string
}
interface CommentsEntity{
_id:string,
content:string,
commentCreator: user,
post:string,
createdAt: string, 
}



export const getAllPosts = createAsyncThunk("user/getAllPosts", async (token: string, {rejectWithValue})=>{
    try{
        const res = await fetch("https://linked-posts.routemisr.com/posts?limit=50&=", {
            method: "GET",
            headers:{
                token,
            }
        });

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || "there is no data"); // Use API error message
          }
        return data.user;
    } catch(err){
        return rejectWithValue((err as Error).message);
    }
})


const initialState = {
    isLoading: false,
    error: null,
    posts: []
} as {
    isLoading: boolean,
    error: string | null,
    posts: postData[]

}

const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
          builder
              .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Clear previous error
              })
              .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string; // Payload is string from rejectWithValue
              })
              .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                
                state.posts = action.payload; 
              });
    }
})


export const postsReducer = postsSlice.reducer