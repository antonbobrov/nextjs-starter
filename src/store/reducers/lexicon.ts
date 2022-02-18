import { LexiconData } from 'src/lexicon/types';
import { AppState } from '../store';

const lexiconReducer = (
    state: LexiconData = {} as LexiconData,
    action: {
        type: 'SET_LEXICON',
        data: LexiconData;
    },
): LexiconData => {
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

