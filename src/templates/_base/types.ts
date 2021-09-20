export interface PagePlaceholderResponse<Data = {}> {
    success: boolean;
    code: number;
    message: string;
    object: Data | false;
}



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

export interface LexiconData {
    siteName: string;
}



export interface TemplateBaseData {
    time: number;
    template: string;

    lang: string;
    dir: 'ltr' | 'rtl';

    url: UrlData;
    meta: MetaData[];
    document: DocumentData;
    settings: SettingsData;
    lexicon: LexiconData | false;

}
