import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

type State = {
    preloader: {
        hide: boolean;
        hidden: boolean;
    };
    popupMenu: {
        shown: boolean;
    }
}

const initialState: State = {
    preloader: {
        hide: false,
        hidden: false,
    },
    popupMenu: {
        shown: false,
    },
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setPreloaderHide (state) {
            state.preloader.hide = true;
        },
        setPreloaderHidden (state) {
            state.preloader.hidden = true;
        },
        showPopupMenu (state) {
            state.popupMenu.shown = true;
        },
        hidePopupMenu (state) {
            state.popupMenu.shown = false;
        },
    },
});
export default layoutSlice;

export const selectLayout = (state: AppState) => state.layout;
