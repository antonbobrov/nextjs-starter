import dynamic from 'next/dynamic';
import { FC } from 'react';
import { BaseTemplateData } from '../types/page';

const Empty = dynamic(import('./Empty'), {
    ssr: true,
});
const Home = dynamic(import('./home'), {
    ssr: true,
});
const TextPage = dynamic(import('./text'), {
    ssr: true,
});
const Examples = dynamic(import('./examples'), {
    ssr: true,
});

const RenderTemplate: FC<BaseTemplateData> = (
    props,
) => {
    const { template } = props;

    switch (template) {
        case 'home':
            return <Home {...props as any} key={props.time} />;
        case 'text':
            return <TextPage {...props as any} key={props.time} />;
        case 'examples':
            return <Examples {...props as any} key={props.time} />;
        default:
            return <Empty {...props as any} key={props.time} />;
    }
};

export default RenderTemplate;
