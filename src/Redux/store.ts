// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { postsReducer } from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },

});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;