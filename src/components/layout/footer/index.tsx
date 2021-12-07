import { selectStorePageProps } from '@/store/reducers/page';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const LayoutFooter = () => {
    const pageProps = useSelector(selectStorePageProps);
    const copyrightText = pageProps.lexicon.copyright.replace('{year}', `${new Date().getFullYear()}`);

    return (
        <footer className={styles.layout_footer}>
            <div className={styles.copyright}>{copyrightText}</div>
        </footer>
    );
};
export default LayoutFooter;
