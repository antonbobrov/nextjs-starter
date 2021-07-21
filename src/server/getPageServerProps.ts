import fetch from 'node-fetch';
import { getPagesApiUrl } from '../../server-config';
import { ITemplateBase } from '../templates/placeholder';

export default async function getPageServerProps (
    reqUrl: string | undefined,
) {
    async function getResponse (): Promise<ITemplateBase> {
        const apiUrl = getPagesApiUrl();
        const url = new URL(apiUrl);
        if (reqUrl) {
            url.searchParams.append('requestUrl', reqUrl);
        }
        const response = await fetch(url, {
            method: 'get',
        });
        const json = await response.json();
        json.res = {
            status: response.status,
            statusText: response.statusText,
        };
        return json;
    }

    const response = await getResponse();
    return response;
}
