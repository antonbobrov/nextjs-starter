import PCancelable from 'p-cancelable';
import store, { AppState } from '../store';

type State = {
    preloaderDone: boolean;
    preloaderHide: boolean;
    preloaderReady: boolean;
    popupMenuShown: boolean;
    loadingCount: number;
    firstLoad: boolean;
}

const layoutReducer = (
    state: State = {
        preloaderDone: false,
        preloaderHide: false,
        preloaderReady: false,
        popupMenuShown: false,
        loadingCount: -1,
        firstLoad: true,
    },
    action: {
        type: 'SET_PRELOADER_DONE'
    } | {
        type: 'SET_PRELOADER_HIDE'
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
    } | {
        type: 'FIRST_PAGE_LOAD_DONE',
    },
): State => {
    switch (action.type) {
        case 'SET_PRELOADER_DONE':
            state.preloaderDone = true;
            break;
        case 'SET_PRELOADER_HIDE':
            state.preloaderHide = true;
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
        case 'FIRST_PAGE_LOAD_DONE':
            state.firstLoad = false;
            break;
        default:
            break;
    }

    function handleLoading () {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('is-loading', state.loadingCount > 0);
        }
    }

    return {
        ...state,
    };
};
export default layoutReducer;

export const selectLayout = (state: AppState) => state.layout;

export const onLayoutPreloaderReady = () => new PCancelable<void>((resolve) => {
    if (store.getState().layout.preloaderReady) {
        resolve();
    } else {
        const event = store.subscribe(() => {
            if (store.getState().layout.preloaderReady) {
                event();
                resolve();
            }
        });
    }
});
