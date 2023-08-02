import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ILexicon } from '@/lexicon/types';
import { TAppState } from '../store';

type TState = ILexicon;

const initialState: TState = {} as TState;

export const lexiconSlice = createSlice({
  name: 'lexicon',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TState>) {
      return action.payload;
    },
  },
});

const select = (state: TAppState) => state.lexicon;

export function useStoreLexicon() {
  return useSelector(select);
}
