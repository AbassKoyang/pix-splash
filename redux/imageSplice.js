import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: 'imagelist',
    initialState: {
        imagesarray: [],
    },
    reducers: {
        setImages: (state, action) => {
          state.imagesarray = action.payload;
        },
      },
})
export const { setImages } = imageSlice.actions;
export const selectImages = (state) => state.imagelist.imagesarray;
export default imageSlice.reducer;