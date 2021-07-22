import type { DeepRequired } from 'ts-essentials';

export interface ITemplateBase {

    res: {
        status: number,
        statusText: string
    },

    template: string;

    siteName: string;

    document: {
        lang?: string;
        dir?: 'ltr' | 'rtl';
        pagetitle?: string;
        longtitle?: string;
        description?: string;
        introtext?: string;
        content?: string;
    };

    url: {
        url: string;
        siteUrl: string;
        canonicalUrl: string;
        staticUrl: string;
    };

    meta: {
        description?: string | undefined;
        keywords?: string | undefined;
        image?: string | undefined;
    };

    settings: {
        searchable: boolean;
    };

}

export default function getPlaceholder (
    url: URL,
): DeepRequired<ITemplateBase> {
    return {

        res: {
            status: 200,
            statusText: 'ok',
        },

        template: '',

        siteName: 'Website',

        document: {
            lang: 'en',
            dir: 'ltr',
            pagetitle: 'Page name',
            longtitle: 'Long Page name',
            description: '',
            introtext: '',
            content: '',
        },

        url: {
            url: url.href,
            siteUrl: `${url.origin}/`,
            canonicalUrl: new URL(url.origin + url.pathname).href,
            staticUrl: `${url.origin}/`,
        },

        meta: {
            description: 'Test description',
            keywords: '',
            image: '',
        },

        settings: {
            searchable: true,
        },

    };
}
