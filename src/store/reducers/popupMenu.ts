import { RootState } from '../store';

export const popupMenuReducer = (
    state = {
        shown: false,
    },
    action: {
        type: 'showPopupMenu';
    } | {
        type: 'hidePopupMenu';
    },
) => {
    switch (action.type) {
        case 'showPopupMenu':
            state.shown = true;
            return state;
        case 'hidePopupMenu':
            state.shown = false;
            return state;
        default:
            return state;
    }
};

export const selectPopupMenu = (state: RootState) => state.popupMenu;
