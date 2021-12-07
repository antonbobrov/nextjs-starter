import { combineReducers, createStore } from 'redux';
import page from './reducers/page';
import layout from './reducers/layout';

const store = createStore(
    combineReducers({
        page,
        layout,
    }),
);
export default store;

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
