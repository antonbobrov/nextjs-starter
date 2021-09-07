import dynamic from 'next/dynamic';
import { TemplateBaseData } from './_base/types';

const Empty = dynamic(import('./Empty'), {
    ssr: true,
});
const Home = dynamic(import('./home/Home'), {
    ssr: true,
});
const TextPage = dynamic(import('./text-page'), {
    ssr: true,
});
const Examples = dynamic(import('./examples'), {
    ssr: true,
});

const RenderTemplate = (
    props: TemplateBaseData,
) => {
    const { template } = props;

    switch (template) {
        case 'home':
            return <Home {...props as any} />;
        case 'text-page':
            return <TextPage {...props as any} />;
        case 'examples':
            return <Examples {...props as any} />;
        default:
            return <Empty {...props as any} />;
    }
};

export default RenderTemplate;
