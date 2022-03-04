import { Middleware } from '@reduxjs/toolkit';
import { AppState } from '../store';

const loadingCountMiddleware: Middleware<
    {},
    AppState
> = (storeAPI) => (next) => (action) => {
    const result = next(action);
    const state = storeAPI.getState();
    if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('is-loading', state.loading.count > 0);
    }
    return result;
};
export default loadingCountMiddleware;
