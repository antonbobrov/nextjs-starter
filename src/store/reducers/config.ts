import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { IPageConfig } from '@/types/Page';
import { TAppState } from '../store';

type TState = IPageConfig;

const initialState: TState = {} as TState;

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TState>) => action.payload,
  },
});

const select = (state: TAppState) => state.config;

export function useStoreConfig() {
  return useSelector(select);
}
