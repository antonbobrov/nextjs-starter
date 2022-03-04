import { ConfigProps } from '@/types/page';
import { Reducer } from 'redux';
import { AppState } from '../store';

type State = ConfigProps;

type Action = {
    type: 'SET_CONFIG',
    data: ConfigProps;
};

const configReducer: Reducer<State, Action> = (
    state = {} as State,
    action,
): State => {
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

