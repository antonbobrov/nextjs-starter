import { FC, useEffect } from 'react';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import TextContent from '../../components/layout/text/text-content';
import styles from './styles.module.scss';
import { BaseTemplateData } from '../../types/page';



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
                <div className="page-content">
                    <div className="wrap v-view_b">
                        <div className={styles.page__content}>
                            <TextContent html={content} />
                            <div className="clear" />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutSmoothScroll>
    );
};

export default TextPageTemplate;
