import { Redirect } from 'next';
import { LexiconData } from 'src/lexicon/types';
import { ConfigProps, PageApiProps } from './page';

export type SspClient<
    TemplateProps extends Record<string, any> = {}
> = {
    data?: {
        props: PageApiProps<TemplateProps>;
        config: ConfigProps;
        lexicon: LexiconData;
    };
    error?: {
        name?: string;
        body?: string;
    };
}

export type SspServer<
    TemplateProps extends Record<string, any> = {}
> = {
    time: number;
    api: {
        url: string;
        statusCode: number;
        statusText: string;
    };
    redirect?: Redirect;
} & SspClient<TemplateProps>;
