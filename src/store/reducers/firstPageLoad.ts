const firstPageLoadReducer = (
    state = {
        yes: true,
    },
    action: {
        type: 'FIRST_PAGE_LOAD_DONE';
    },
) => {
    switch (action.type) {
        case 'FIRST_PAGE_LOAD_DONE':
            state.yes = false;
            return state;
        default:
            return state;
    }
};
export default firstPageLoadReducer;
