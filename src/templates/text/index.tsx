import { FC, useEffect } from 'react';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import TextContent from '../../components/layout/text/text-content';
import styles from './styles.module.scss';
import { BaseTemplateData } from '../../types/page';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';



export interface TextPageTemplateData extends BaseTemplateData {
    template: 'text';
}



const TextPageTemplate: FC<TextPageTemplateData> = (
    props,
) => {
    const { document } = props;
    const { content } = document;
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
            <div className={styles.page}>
                <Header isFixed={false} />
                <div className="page-content">
                    <div className="wrap v-view_b">
                        <div className={styles.page__content}>
                            <TextContent html={content} />
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
