import { ConfigProps } from '@/types/page';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

type State = ConfigProps;

const initialState: State = {} as State;

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<ConfigProps>) => action.payload,
    },
});
export default configSlice;

export const selectConfig = (state: AppState) => state.config;

