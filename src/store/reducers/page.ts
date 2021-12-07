import { TemplateProps } from '@/types/page';
import { AppState } from '../store';

type State = {
    firstLoad: boolean;
    props: TemplateProps;
}

const pageReducer = (
    state: State = {
        firstLoad: true,
        props: undefined as any,
    },
    action: {
        type: 'FIRST_PAGE_LOAD_DONE',
    } | {
        type: 'SET_PAGE_PROPS',
        data: TemplateProps;
    },
): State => {
    switch (action.type) {
        case 'FIRST_PAGE_LOAD_DONE':
            return {
                ...state,
                firstLoad: false,
            };
        case 'SET_PAGE_PROPS':
            return {
                ...state,
                props: action.data,
            };
        default:
            break;
    }
    return state;
};
export default pageReducer;

export const selectStorePage = (state: AppState) => state.page;
export const selectStorePageProps = (state: AppState) => state.page.props;
