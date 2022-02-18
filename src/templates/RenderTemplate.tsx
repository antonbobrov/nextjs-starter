import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { VFC } from 'react';
import { selectPageProps } from '@/store/reducers/pageProps';
import { selectConfig } from '@/store/reducers/config';

const Empty = dynamic(import('./Empty'), {
    ssr: true,
});
const NotFound = dynamic(import('./not-found'), {
    ssr: true,
});
const Home = dynamic(import('./home'), {
    ssr: true,
});
const Text = dynamic(import('./text'), {
    ssr: true,
});
const Examples = dynamic(import('./examples'), {
    ssr: true,
});

const RenderTemplate: VFC = () => {
    const pageProps = useSelector(selectPageProps);
    const template = pageProps.templateName;
    const pageConfig = useSelector(selectConfig);
    const { key } = pageConfig;

    switch (template) {
        case 'not-found':
            return <NotFound key={key} />;
        case 'home':
            return <Home key={key} />;
        case 'text':
            return <Text key={key} />;
        case 'examples':
            return <Examples key={key} />;
        default:
            return <Empty key={key} />;
    }
};

export default RenderTemplate;
