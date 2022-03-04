import { createSlice } from '@reduxjs/toolkit';
import { utils } from 'vevet';
import { AppState } from '../store';

type State = {
    count: number;
    firstLoad: boolean;
}

const initialState: State = {
    count: -1,
    firstLoad: true,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        start (state) {
            state.count = utils.math.clamp(state.count + 1, [0, Infinity]);
        },
        end (state) {
            state.count = utils.math.clamp(state.count - 1, [0, Infinity]);
        },
        firstLoaded (state) {
            state.firstLoad = false;
        },
    },
});
export default loadingSlice;

export const selectLoading = (state: AppState) => state.loading;

