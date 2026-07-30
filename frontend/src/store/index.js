import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import trackReducer from './trackSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tracks: trackReducer,
  },
});