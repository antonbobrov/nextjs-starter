import { combineReducers, createStore } from 'redux';
import pageProps from './reducers/pageProps';
import layout from './reducers/layout';

const store = createStore(
    combineReducers({
        pageProps,
        layout,
    }),
);
export default store;

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
