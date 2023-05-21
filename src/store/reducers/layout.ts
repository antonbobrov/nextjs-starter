import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TAppState } from '../store';

type TState = {
  isFirstLoaded: boolean;
  isVisible: boolean;
  isCurtainVisible: boolean;
};

const initialState: TState = {
  isFirstLoaded: false,
  isVisible: false,
  isCurtainVisible: false,
};

export const layoutSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsFirstLoaded: (state) => ({
      ...state,
      isFirstLoaded: true,
    }),
    setIsVisible: (state, payload: PayloadAction<boolean>) => ({
      ...state,
      isVisible: payload.payload,
    }),
    setIsCurtainVisible: (state, payload: PayloadAction<boolean>) => ({
      ...state,
      isCurtainVisible: payload.payload,
    }),
  },
});

const select = (state: TAppState) => state.layout;

export function useStoreLayout() {
  return useSelector(select);
}
