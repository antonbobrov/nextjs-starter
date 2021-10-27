import { useContext } from 'react';
import PageContext from '../../../store/PageContext';
import styles from './styles.module.scss';

const Footer = () => {
    const props = useContext(PageContext);
    const copyrightText = props.lexicon.copyright.replace('{year}', `${new Date().getFullYear()}`);

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__copyright}>{copyrightText}</div>
        </footer>
    );
};
export default Footer;
