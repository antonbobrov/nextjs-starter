import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loadingCountMiddleware from './middleware/loadingCount';
import configSlice from './reducers/config';
import loadingSlice from './reducers/loading';
import layoutSlice from './reducers/layout';
import pagePropsSlice from './reducers/pageProps';
import lexiconSlice from './reducers/lexicon';

const rootReducer = combineReducers({
    config: configSlice.reducer,
    loading: loadingSlice.reducer,
    layout: layoutSlice.reducer,
    pageProps: pagePropsSlice.reducer,
    lexicon: lexiconSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [loadingCountMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
});
export default store;

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
