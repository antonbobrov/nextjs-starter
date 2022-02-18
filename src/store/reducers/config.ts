import { ConfigProps } from '@/types/page';
import { AppState } from '../store';

const configReducer = (
    state: ConfigProps = {} as ConfigProps,
    action: {
        type: 'SET_CONFIG',
        data: ConfigProps;
    },
): ConfigProps => {
    switch (action.type) {
        case 'SET_CONFIG':
            return {
                ...action.data,
            };
        default:
            break;
    }
    return state;
};
export default configReducer;

export const selectConfig = (state: AppState) => state.config;

