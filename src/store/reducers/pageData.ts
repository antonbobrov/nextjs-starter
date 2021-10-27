import { BaseTemplateData } from '../../types/page';
import { RootState } from '../store';

export const pageDataReducer = (
    state: BaseTemplateData = {} as BaseTemplateData,
    action: {
        type: 'updatePageData';
        data: BaseTemplateData;
    },
) => {
    switch (action.type) {
        case 'updatePageData':
            state = action.data;
            return state;
        default:
            return state;
    }
};

export const selecPageDataReducer = (state: RootState) => state.pageData;
