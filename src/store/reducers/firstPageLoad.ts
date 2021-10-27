import { RootState } from '../store';

export const firstPageLoadReducer = (
    state = {
        yes: true,
    },
    action: {
        type: 'firstPageLoadDone';
    },
) => {
    switch (action.type) {
        case 'firstPageLoadDone':
            state.yes = false;
            return state;
        default:
            return state;
    }
};

export const selectFirstPageLoadReducer = (state: RootState) => state.firstPageLoad;
