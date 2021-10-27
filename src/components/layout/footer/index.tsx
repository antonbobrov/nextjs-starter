import PageContext from '../../../store/PageContext';
import styles from './styles.module.scss';

const Footer = () => (
    <PageContext.Consumer>
        {(props) => {
            const copyrightText = props.lexicon.copyright.replace('{year}', `${new Date().getFullYear()}`);
            return (
                <footer className={styles.footer}>
                    <div className={styles.footer__copyright}>{copyrightText}</div>
                </footer>
            );
        }}
    </PageContext.Consumer>
);
export default Footer;
