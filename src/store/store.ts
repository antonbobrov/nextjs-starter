import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { configSlice } from './reducers/config';
import { pagePropsSlice } from './reducers/pageProps';
import { lexiconSlice } from './reducers/lexicon';
import { loadingSlice } from './reducers/loading';
import { layoutSlice } from './reducers/layout';
import { menuSlice } from './reducers/menu';
import { loadingMiddleware } from './middleware/loading';

const rootReducer = combineReducers({
  config: configSlice.reducer,
  pageProps: pagePropsSlice.reducer,
  lexicon: lexiconSlice.reducer,
  loading: loadingSlice.reducer,
  layout: layoutSlice.reducer,
  menu: menuSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [loadingMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;

export type TAppState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
