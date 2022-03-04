import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LexiconData } from 'src/lexicon/types';
import { AppState } from '../store';

type State = LexiconData;

const initialState: State = {} as State;

const lexiconSlice = createSlice({
    name: 'lexicon',
    initialState,
    reducers: {
        set (state, action: PayloadAction<State>) {
            return action.payload;
        },
    },
});
export default lexiconSlice;

export const selectLexicon = (state: AppState) => state.lexicon;

