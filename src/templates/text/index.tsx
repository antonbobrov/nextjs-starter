import { useContext, useEffect } from 'react';
import { TemplateProps } from '@/types/page';
import store from '@/store/store';
import PageContext from '@/store/PageContext';
import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import LayoutHeader from '@/components/layout/header';
import TextContent from '@/components/text/content';
import LayoutBreadCrumbs from '@/components/layout/breadcrumbs';
import LayoutFooter from '@/components/layout/footer';
import LayoutWrapper from '@/components/layout/wrapper';
import styles from './styles.module.scss';

export interface TemplateTextProps extends TemplateProps {
    data: {};
}

const TemplateText = () => {
    const pageProps = useContext(PageContext);

    useEffect(() => {
        store.dispatch({
            type: 'SET_TEMPLATE_IS_READY',
            data: true,
        });
    }, []);

    // render the template
    return (
        <LayoutSmoothScroll>
            <LayoutHeader isFixed={false} />
            <LayoutWrapper>
                <LayoutBreadCrumbs />
                <div className={styles.text_page}>
                    <div className="wrap">
                        <div className={styles.text_page__content}>
                            <TextContent html={pageProps.document.content} />
                            <div className="clear" />
                        </div>
                    </div>
                </div>
            </LayoutWrapper>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateText;
