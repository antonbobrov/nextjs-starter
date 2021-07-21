export interface ITemplateBase {
    lang: string;
    dir: 'ltr' | 'rtl';
    searchable: boolean;

    res: {
        status: number,
        statusText: string
    },

    siteName: string;
    title: string;

    url: {
        url: string;
        siteUrl: string;
        canonicalUrl: string;
        staticUrl: string;
    }

    meta: {
        description?: string | undefined;
        keywords?: string | undefined;
        image?: string | undefined;
    },

    template: string;
}

export default function getPlaceholder (
    url: URL,
): ITemplateBase {
    return {
        lang: 'en',
        dir: 'ltr',
        searchable: true,

        res: {
            status: 200,
            statusText: 'ok',
        },

        siteName: 'Website',
        title: '',

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

        template: '',
    };
}
