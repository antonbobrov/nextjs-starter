import fetch from 'node-fetch';
import { getPagesApiUrl } from '../../../server-config';
import ITemplateData from '../../templates/types';

export default async function getPageServerProps (
    reqUrl: string | undefined,
) {
    async function getResponse (): Promise<ITemplateData> {
        const apiUrl = getPagesApiUrl();
        const url = new URL(apiUrl);
        if (reqUrl) {
            url.searchParams.append('requestUrl', reqUrl);
        }
        const response = await fetch(url, {
            method: 'get',
        });
        const json = await response.json();
        return json;
    }

    const response = await getResponse();
    return response;
}
