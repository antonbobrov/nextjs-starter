interface IData {
    lang: string;
    dir: 'ltr' | 'rtl';
    searchable: boolean;

    siteName: string;
    title: string;

    response: {
        status: string | number;
    },

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

export default IData;
