import { combineReducers, createStore } from 'redux';
import template from './reducers/template';
import firstPageLoad from './reducers/firstPageLoad';
import popupMenu from './reducers/popupMenu';

const store = createStore(
    combineReducers({
        template,
        firstPageLoad,
        popupMenu,
    }),
);
export default store;

export const isFirstPageLoad = () => store.getState().firstPageLoad.yes;
