import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TAppState } from '../store';

type TState = {
  isFirstLoaded: boolean;
};

const initialState: TState = {
  isFirstLoaded: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsFirstLoaded: (state) => ({
      ...state,
      isFirstLoaded: true,
    }),
  },
});

const select = (state: TAppState) => state.layout;

export function useStoreLayout() {
  return useSelector(select);
}
