import { selectPagePropsLexicon } from '@/store/reducers/pageProps';
import { useOnPageLoadedHook, useOnPageShownHook } from '@/utils/hooks/vevet';
import { useCallback, useRef, VFC } from 'react';
import { useSelector } from 'react-redux';
import app from 'src/app';
import styles from './styles.module.scss';

const LayoutFooter: VFC = () => {
    const lexicon = useSelector(selectPagePropsLexicon);
    const copyrightText = lexicon.copyright.replace('{year}', `${new Date().getFullYear()}`);

    const parentRef = useRef<HTMLElement>(null);

    // resize the element
    const resize = useCallback(() => {
        if (!parentRef.current) {
            return;
        }
        app.html.style.setProperty('--footer-height', `${parentRef.current.clientHeight}px`);
    }, [parentRef]);
    useOnPageLoadedHook(() => {
        resize();
    }, [resize]);
    useOnPageShownHook(() => {
        resize();
        return app.viewport.add(app.isMobile ? 'w' : '', () => {
            resize();
        }, {
            name: 'footer',
        }).remove;
    }, [resize]);

    return (
        <footer
            ref={parentRef}
            className={styles.layout_footer}
        >
            <div className={styles.copyright}>{copyrightText}</div>
        </footer>
    );
};
export default LayoutFooter;
