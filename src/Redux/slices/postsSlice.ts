import { postData } from "@/Interfaces/Interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
  "user/getAllPosts",
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://linked-posts.routemisr.com/posts?limit=50&=",
        {
          method: "GET",
          headers: {
            token,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "there is no data"); // Use API error message
      }
      return data.posts;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
} as {
  isLoading: boolean;
  error: string | null;
  posts: postData[];
};

const postsSlice = createSlice({
  name: "posts",
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
  },
});

export const postsReducer = postsSlice.reducer;
