import { Reducer } from 'redux';
import { utils } from 'vevet';
import { AppState } from '../store';

type State = {
    preloaderHide: boolean;
    preloaderHidden: boolean;
    popupMenuShown: boolean;
    loadingCount: number;
    firstLoad: boolean;
}

type Action = {
    type: 'SET_PRELOADER_HIDE'
} | {
    type: 'SET_PRELOADER_HIDDEN'
} | {
    type: 'SHOW_POPUP_MENU'
} | {
    type: 'HIDE_POPUP_MENU'
} | {
    type: 'START_LOADING'
} | {
    type: 'END_LOADING'
} | {
    type: 'FIRST_PAGE_LOAD_DONE',
};

const layoutReducer: Reducer<State, Action> = (
    state = {
        preloaderHide: false,
        preloaderHidden: false,
        popupMenuShown: false,
        loadingCount: -1,
        firstLoad: true,
    },
    action,
): State => {
    switch (action.type) {
        case 'SET_PRELOADER_HIDE':
            return {
                ...state,
                preloaderHide: true,
            };
        case 'SET_PRELOADER_HIDDEN':
            return {
                ...state,
                preloaderHidden: true,
            };
        case 'SHOW_POPUP_MENU':
            return {
                ...state,
                popupMenuShown: true,
            };
        case 'HIDE_POPUP_MENU':
            return {
                ...state,
                popupMenuShown: false,
            };
        case 'START_LOADING':
            return {
                ...state,
                loadingCount: state.loadingCount + 1,
            };
        case 'END_LOADING':
            return {
                ...state,
                loadingCount: utils.math.clamp(state.loadingCount - 1, [0, Infinity]),
            };
        case 'FIRST_PAGE_LOAD_DONE':
            return {
                ...state,
                firstLoad: false,
            };
        default:
            break;
    }

    return state;
};
export default layoutReducer;

export const selectLayout = (state: AppState) => state.layout;
