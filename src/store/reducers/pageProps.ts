import { PageProps } from '@/types/page';
import { AppState } from '../store';

type State = Omit<PageProps, 'response'>;

const pagePropsReducer = (
    state: State = {} as State,
    action: {
        type: 'SET_PAGE_PROPS',
        data: State;
    },
): State => {
    switch (action.type) {
        case 'SET_PAGE_PROPS':
            return {
                ...action.data,
            };
        default:
            break;
    }
    return state;
};
export default pagePropsReducer;

export const selectPageProps = (state: AppState) => state.pageProps;
export const selectPagePropsConfig = (state: AppState) => state.pageProps.config;
export const selectPagePropsLexicon = (state: AppState) => state.pageProps.lexicon;
export const selectPagePropsGlobal = (state: AppState) => state.pageProps.global;
export const selectPagePropsTemplate = (state: AppState) => state.pageProps.template;
