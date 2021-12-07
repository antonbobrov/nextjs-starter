import { useContext } from 'react';
import PageContext from '@/store/PageContext';
import styles from './styles.module.scss';

const LayoutFooter = () => {
    const props = useContext(PageContext);
    const copyrightText = props.lexicon.copyright.replace('{year}', `${new Date().getFullYear()}`);

    return (
        <footer className={styles.layout_footer}>
            <div className={styles.copyright}>{copyrightText}</div>
        </footer>
    );
};
export default LayoutFooter;
