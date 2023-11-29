// store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/redux/searchSplice';
import imageReducer from '@/redux/imageSplice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    imagelist: imageReducer,
  },
});

export default store;
