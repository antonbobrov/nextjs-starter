import { combineReducers, createStore } from 'redux';
import { firstPageLoadReducer } from './reducers/firstPageLoad';
import { pageDataReducer } from './reducers/pageData';
import { popupMenuReducer } from './reducers/popupMenu';

export const store = createStore(
    combineReducers({
        pageData: pageDataReducer,
        firstPageLoad: firstPageLoadReducer,
        popupMenu: popupMenuReducer,
    }),
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const isFirstPageLoad = () => store.getState().firstPageLoad.yes;
