const popupMenuReducer = (
    state = {
        shown: false,
    },
    action: {
        type: 'SHOW_POPUP_MENU';
    } | {
        type: 'HIDE_POPUP_MENU';
    },
) => {
    switch (action.type) {
        case 'SHOW_POPUP_MENU':
            state.shown = true;
            return state;
        case 'HIDE_POPUP_MENU':
            state.shown = false;
            return state;
        default:
            return state;
    }
};
export default popupMenuReducer;
