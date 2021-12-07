const templateReducer = (
    state = {
        isReady: false,
    },
    action: {
        type: 'SET_TEMPLATE_IS_READY',
        data: boolean;
    },
) => {
    switch (action.type) {
        case 'SET_TEMPLATE_IS_READY':
            state.isReady = action.data;
            return state;
        default:
            return state;
    }
};
export default templateReducer;
