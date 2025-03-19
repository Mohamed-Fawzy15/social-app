// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { postsReducer } from "./slices/postsSlice";

// Load token from localStorage
const persistedToken = localStorage.getItem("token");
const preloadedState = persistedToken
  ? { user: { token: persistedToken, user: null, isLoading: false, error: null } }
  : {};

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
  preloadedState, // Add preloaded state
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;