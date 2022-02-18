import { combineReducers, createStore } from 'redux';
import pageProps from './reducers/pageProps';
import layout from './reducers/layout';
import config from './reducers/config';
import lexicon from './reducers/lexicon';

const store = createStore(
    combineReducers({
        pageProps,
        layout,
        config,
        lexicon,
    }),
);
export default store;

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
