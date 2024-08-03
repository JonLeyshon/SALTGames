// store.js
import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import imagesSliceReducer from "./imagesSlice";

export const store = configureStore({
  reducer: {
    choices: userSliceReducer,
    images: imagesSliceReducer,
  },
});
