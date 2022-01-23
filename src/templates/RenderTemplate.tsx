import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { VFC } from 'react';
import { selectPageProps, selectPagePropsConfig } from '@/store/reducers/pageProps';

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
    const pageConfig = useSelector(selectPagePropsConfig);
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
