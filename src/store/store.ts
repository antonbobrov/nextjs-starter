import {
    applyMiddleware, combineReducers, createStore,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import pageProps from './reducers/pageProps';
import layout from './reducers/layout';
import config from './reducers/config';
import lexicon from './reducers/lexicon';
import loadingCountMiddleware from './middleware/loadingCount';

const rootReducer = combineReducers({
    pageProps,
    layout,
    config,
    lexicon,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(loadingCountMiddleware),
    ),
);
export default store;

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
export type AppAction = Parameters<typeof store.dispatch>[0];
