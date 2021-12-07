import { createStore } from 'redux';
import app from 'src/app';

interface StateData {
    count: number;
}

const reducer = (
    state: StateData = {
        count: 0,
    },
    action: {
        type: 'start' | 'end'
    },
) => {
    function handler () {
        if (app) {
            app.html.classList.toggle('is-loading', state.count > 0);
        }
    }

    switch (action.type) {
        case 'start':
            state.count += 1;
            handler();
            return state;
        case 'end':
            state.count -= 1;
            if (state.count < 0) {
                state.count = 0;
            }
            handler();
            return state;
        default:
            return state;
    }
};

const pageIsLoading = createStore(reducer);
export default pageIsLoading;
