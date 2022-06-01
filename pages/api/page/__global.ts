import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { GlobalProps } from '@/types/page';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<
        DeepRequired<GlobalProps>
    >,
) {
    // return data
    res.json({
        lang: 'en',
        dir: 'ltr',

        document: {
            pagetitle: 'Next.JS Vevet Starter',
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
            // set false when need "noindex" in head
            searchable: true,
        },

        // relative paths
        globalLinks: {
            home: '/',
        },

        siteMenu: [
            {
                id: 0, href: '/text-page/', name: 'Text Page', isActive: false,
            },
            {
                id: 1, href: '/examples/', name: 'Examples', isActive: false,
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

    });
}
