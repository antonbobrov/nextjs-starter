import dynamic from 'next/dynamic';
import type { ITemplateBase } from './placeholder';

const Empty = dynamic(import('./Empty'), {
    ssr: true,
});
const Home = dynamic(import('./home/Home'), {
    ssr: true,
});

const RenderTemplate = (
    props: ITemplateBase,
) => {
    const { template } = props;

    switch (template) {
        case 'home':
            return <Home {...props as any} />;
        default:
            return <Empty {...props as any} />;
    }
};

export default RenderTemplate;
