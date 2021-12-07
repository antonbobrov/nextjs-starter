import { LayoutBreadCrumbsProps } from '@/components/layout/breadcrumbs';
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

export interface LanguagesData {
    key: string;
    href: string;
    name: string;
    fullName: string;
    isActive: boolean;
}



export interface TemplateDynamicProps {
    key: number;
    url: UrlData;
    userConfig: UserConfig;
    warning?: string;
    errorMessage?: string;
}

interface UserConfig {
    supportsWebP: boolean;
}

export interface TemplateProps extends TemplateDynamicProps {
    success: boolean;

    template: string;

    lang: string;
    dir: 'ltr' | 'rtl';

    meta: MetaData;
    document: DocumentData;
    settings: SettingsData;
    lexicon: LexiconData;

    inject?: {
        headJS?: string;
        prependBody?: string;
        appendBody?: string;
    };

    globalLinks: GlobalLinksData;
    siteMenu: MenuLinkData[];
    languages: LanguagesData[];
    breadcrumbs: LayoutBreadCrumbsProps[];

    data: any;

}
