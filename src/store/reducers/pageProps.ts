import { PageApiProps } from '@/types/page';
import { AppState } from '../store';

const pagePropsReducer = (
    state: PageApiProps = {} as PageApiProps,
    action: {
        type: 'SET_PAGE_PROPS',
        data: PageApiProps;
    },
): PageApiProps => {
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
export const selectPagePropsGlobal = (state: AppState) => state.pageProps.global;
export const selectPagePropsTemplate = (state: AppState) => state.pageProps.template;
