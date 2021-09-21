import { LexiconData } from './lexicon';



export type MetaData = {
    attrType: 'name' | 'property';
    attrVal: string;
    content: string;
}

export interface UrlData {
    url: string;
    siteUrl: string;
    canonicalUrl: string;
    staticUrl: string;
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



export interface BaseTemplateData {
    time: number;
    template: string;

    lang: string;
    dir: 'ltr' | 'rtl';

    url: UrlData;
    meta: MetaData[];
    document: DocumentData;
    settings: SettingsData;
    lexicon: LexiconData;

}
