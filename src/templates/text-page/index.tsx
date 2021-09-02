import { useEffect } from 'react';
import { TemplateBaseData } from '../_base/types';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll/LayoutSmoothScroll';
import TextContent from '../../components/layout/text-content/TextContent';
import styles from './Styles.module.scss';


export interface TextPageTemplateData extends TemplateBaseData {
    template: 'text-page';
}



const TextPageTemplate = (
    prop: TextPageTemplateData,
) => {
    const { document } = prop;
    const { content } = document;
    // create page instance
    useEffect(() => {
        const page = new AppPage({
            name: prop.template,
        });
        page.create();
    });

    // render the template
    return (
        <LayoutSmoothScroll>
            <div className="page-content">
                <div className="wrap v-view_b">
                    <div className={styles.text_page__content}>
                        <TextContent html={content} />
                        <div className="clear" />
                    </div>
                </div>
            </div>
        </LayoutSmoothScroll>
    );
};

export default TextPageTemplate;
