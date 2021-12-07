import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import AppPage from 'src/app/AppPage';
import PageContext from '@/store/PageContext';
import store from '@/store/store';

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

const RenderTemplate = () => {
    const pageProps = useContext(PageContext);
    const { key, template } = pageProps;

    const [isReadyKey, setIsReadyKey] = useState(-1);

    useEffect(() => {
        if (store.getState().template.isReady) {
            setIsReadyKey(key);
        }
        return store.subscribe(() => {
            if (store.getState().template.isReady) {
                setIsReadyKey(key);
            }
        });
    }, [key]);

    useEffect(() => {
        if (key === isReadyKey) {
            const page = new AppPage({
                name: template,
            });
            page.create();
        }
    }, [key, isReadyKey, template]);

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
