import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, { payload }) => {
      state.images = payload;
    },
  },
});

export const { setImages } = imagesSlice.actions;

export const selectImages = (state) => state.images.images;

export default imagesSlice.reducer;
