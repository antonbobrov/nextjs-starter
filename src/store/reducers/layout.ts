import { AppState } from '../store';

type State = {
    preloaderDone: boolean;
    preloaderReady: boolean;
    popupMenuShown: boolean;
    loadingCount: number;
}

const layoutReducer = (
    state: State = {
        preloaderDone: false,
        preloaderReady: false,
        popupMenuShown: false,
        loadingCount: -1,
    },
    action: {
        type: 'SET_PRELOADER_DONE'
    } | {
        type: 'SET_PRELOADER_READY'
    } | {
        type: 'SHOW_POPUP_MENU'
    } | {
        type: 'HIDE_POPUP_MENU'
    } | {
        type: 'START_LOADING'
    } | {
        type: 'END_LOADING'
    },
): State => {
    switch (action.type) {
        case 'SET_PRELOADER_DONE':
            state.preloaderDone = true;
            break;
        case 'SET_PRELOADER_READY':
            state.preloaderReady = true;
            break;
        case 'SHOW_POPUP_MENU':
            state.popupMenuShown = true;
            break;
        case 'HIDE_POPUP_MENU':
            state.popupMenuShown = false;
            break;
        case 'START_LOADING':
            state.loadingCount += 1;
            handleLoading();
            break;
        case 'END_LOADING':
            state.loadingCount -= 1;
            if (state.loadingCount < 0) {
                state.loadingCount = 0;
            }
            handleLoading();
            break;
        default:
            break;
    }

    function handleLoading () {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('is-loading', state.loadingCount > 0);
        }
    }

    return state;
};
export default layoutReducer;

export const selectStoreLayout = (state: AppState) => state.layout;
