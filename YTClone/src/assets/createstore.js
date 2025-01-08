import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './videosslice.js';

const store = configureStore({
  reducer: {
    videos: videosReducer
  }
});

export default store;