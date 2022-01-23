import { selectPageProps } from '@/store/reducers/pageProps';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppPage from 'src/app/AppPage';

export default function useTemplatePage () {
    const [isReady, setIsReady] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [name] = useState(
        useSelector(selectPageProps).templateName,
    );

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isReady || isCreated) {
            return;
        }
        setIsCreated(true);
        const page = new AppPage({
            name,
        });
        page.create();
    }, [isReady, name, isCreated]);
}
