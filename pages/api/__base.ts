import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { DeepRequired } from 'ts-essentials';
import { LexiconData } from '@/types/lexicon';
import { TemplateProps, TemplateDynamicProps } from '@/types/page';
import env from '@/utils/env';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<
        DeepRequired<
            Omit<TemplateProps, keyof TemplateDynamicProps>
        >
    >,
) {
    // get lexicon
    const lexicon: LexiconData = await (await fetch(env.getUrlBase('/api/__lexicon'))).json();

    // return data
    res.json({
        success: true,

        template: '',

        lang: 'en',
        dir: 'ltr',

        document: {
            pagetitle: lexicon.siteName,
            longtitle: '',
            description: '',
            introtext: '',
            content: '',
        },

        meta: {
            description: '',
            keywords: '',
            image: '',
        },

        settings: {
            searchable: true,
        },

        lexicon,

        inject: {
            headJS: '',
            prependBody: '',
            appendBody: '',
        },

        globalLinks: {
            home: '/',
        },

        siteMenu: [
            {
                id: 0, href: '/text-page/', name: 'Text Page', isActive: false, isExternal: false,
            },
            {
                id: 1, href: '/examples/', name: 'Examples', isActive: false, isExternal: false,
            },
        ],

        languages: [
            {
                key: 'en', href: '/?lang=en', name: 'En', fullName: 'English', isActive: true,
            },
            {
                key: 'de', href: '/?lang=de', name: 'De', fullName: 'Deutsch', isActive: false,
            },
            {
                key: 'es', href: '/?lang=es', name: 'Es', fullName: 'Español', isActive: false,
            },
        ],

        breadcrumbs: [
            { id: 0, href: '/', name: 'Home' },
            { id: 1, href: '/', name: 'Page name' },
        ],

        data: {},

    });
}
