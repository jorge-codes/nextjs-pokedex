import { configureStore } from '@reduxjs/toolkit';
import partyReducer from './partySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      party: partyReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
