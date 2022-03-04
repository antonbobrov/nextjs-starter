import { PageApiProps } from '@/types/page';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

type State = PageApiProps;

const initialState: State = {} as State;

const pagePropsSlice = createSlice({
    name: 'pageProps',
    initialState,
    reducers: {
        set (state, action: PayloadAction<State>) {
            return action.payload;
        },
    },
});
export default pagePropsSlice;

export const selectPageProps = (state: AppState) => state.pageProps;
export const selectPagePropsGlobal = (state: AppState) => state.pageProps.global;
export const selectPagePropsTemplate = (state: AppState) => state.pageProps.template;
