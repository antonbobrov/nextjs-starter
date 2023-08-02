import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { IPage } from '@/types/Page';
import { TAppState } from '../store';

type TState = IPage;

const initialState: TState = {} as TState;

export const pagePropsSlice = createSlice({
  name: 'pageProps',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TState>) {
      return action.payload;
    },
  },
});

const selectPageProps = (state: TAppState) => state.pageProps;

export function useStorePageProps() {
  return useSelector(selectPageProps);
}

const selectGlobalProps = (state: TAppState) => state.pageProps.global;

export function useStoreGlobalProps() {
  return useSelector(selectGlobalProps);
}
