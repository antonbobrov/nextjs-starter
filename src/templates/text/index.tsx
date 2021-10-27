import { useContext, useEffect } from 'react';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import styles from './styles.module.scss';
import { BaseTemplateData } from '../../types/page';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import PageContext from '../../store/PageContext';
import BreadCrumbs from '../../components/layout/breadcrumbs';
import TextContent from '../../components/content/text-content';



export interface TextPageTemplateData extends BaseTemplateData {
    data: {};
}



const TextPageTemplate = () => {
    const props = useContext(PageContext);

    // create page instance
    useEffect(() => {
        const page = new AppPage({
            name: props.template,
        });
        page.create();
        return () => {
            page.hide().then(() => {
                page.destroy();
            }).catch(() => {});
        };
    }, []);

    // render the template
    return (
        <LayoutSmoothScroll>
            <div className={styles.text_page}>
                <Header isFixed={false} />
                <div className="page-content">
                    <BreadCrumbs />
                    <div className="wrap v-view_b">
                        <div className={styles.text_page__content}>
                            <TextContent html={props.document.content} />
                            <div className="clear" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </LayoutSmoothScroll>
    );
};

export default TextPageTemplate;
