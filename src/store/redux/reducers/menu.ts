import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TAppState } from '../store';

type TState = {
  isOpened: boolean;
};

const initialState: TState = {
  isOpened: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    open: (state) => ({
      ...state,
      isOpened: true,
    }),
    close: (state) => ({
      ...state,
      isOpened: false,
    }),
    toggle: (state) => ({
      ...state,
      isOpened: !state.isOpened,
    }),
  },
});

const select = (state: TAppState) => state.menu;

export function useStoreMenu() {
  return useSelector(select);
}
