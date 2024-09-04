import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { loadingSlice } from './reducers/loading';
import { layoutSlice } from './reducers/layout';
import { menuSlice } from './reducers/menu';

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  layout: layoutSlice.reducer,
  menu: menuSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type TAppState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
