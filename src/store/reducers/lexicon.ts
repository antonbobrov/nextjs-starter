import { Reducer } from 'redux';
import { LexiconData } from 'src/lexicon/types';
import { AppState } from '../store';

type State = LexiconData;

type Action = {
    type: 'SET_LEXICON',
    data: LexiconData;
};

const lexiconReducer: Reducer<State, Action> = (
    state = {} as State,
    action,
): State => {
    switch (action.type) {
        case 'SET_LEXICON':
            return {
                ...action.data,
            };
        default:
            break;
    }
    return state;
};
export default lexiconReducer;

export const selectLexicon = (state: AppState) => state.lexicon;

