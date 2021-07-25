import { LexiconData } from '../../templates/_base/types';

export default function getLexiconValue (
    key: keyof LexiconData,
    store: LexiconData | false,
) {
    if (store) {
        if (typeof store[key] !== 'undefined') {
            return store[key];
        }
    }
    return '';
}
