import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts";

export const store = configureStore({
  reducer: postsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
