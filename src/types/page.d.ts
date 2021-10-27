import { LexiconData } from './lexicon';



export type MetaData = {
    description?: string;
    keywords?: string;
    image?: string;
}

export interface UrlData {
    url: string;
    canonical: string;
}

export interface DocumentData {
    pagetitle: string;
    longtitle: string;
    description: string;
    introtext: string;
    content: string;
}

export interface SettingsData {
    searchable: boolean;
}



export interface GlobalLinksData {
    home: string;
}

export interface MenuLinkData {
    id: number;
    href: string;
    name: string;
    isActive: boolean;
    isExternal: boolean;
}

export interface BreadcrumbData {
    id: number | string;
    href: string;
    name: string;
}

export interface LanguagesData {
    key: string;
    href: string;
    name: string;
    fullName: string;
    isActive: boolean;
}



export interface BaseTemplateData {
    success: boolean,

    time: number;
    template: string;

    lang: string;
    dir: 'ltr' | 'rtl';

    url: UrlData;
    meta: MetaData;
    document: DocumentData;
    settings: SettingsData;
    lexicon: LexiconData;

    globalLinks: GlobalLinksData;
    siteMenu: MenuLinkData[];
    languages: LanguagesData[];
    breadcrumbs: BreadcrumbData[];

    data: any;

}
