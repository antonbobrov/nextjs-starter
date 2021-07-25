import { getPagesApiUrl } from '../../server-config';
import { PagePlaceholderResponse } from '../templates/_base/types';
import normalizeUrlSlashes from '../utils/types/normalizeUrlSlashes';
import nodeFetch from './nodeFetch';

export default async function getPageServerProps (
    resolvedUrl: string | undefined,
) {
    async function getResponse (): Promise<PagePlaceholderResponse<any>> {
        const apiUrl = normalizeUrlSlashes(`${getPagesApiUrl()}/${resolvedUrl}`);
        const response = await nodeFetch(apiUrl);
        return {
            success: true,
            code: response.code,
            message: response.message,
            object: response.object,
        };
    }

    const response = await getResponse();
    return response;
}
