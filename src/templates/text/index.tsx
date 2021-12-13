import { TemplateProps } from '@/types/page';
import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import LayoutHeader from '@/components/layout/header';
import TextContent from '@/components/text/content';
import LayoutBreadCrumbs from '@/components/layout/breadcrumbs';
import LayoutFooter from '@/components/layout/footer';
import LayoutWrapper from '@/components/layout/wrapper';
import { useSelector } from 'react-redux';
import { selectStorePageProps } from '@/store/reducers/page';
import styles from './styles.module.scss';
import useTemplatePage from '../useTemplatePage';

export interface TemplateTextProps extends TemplateProps {
    data: {};
}

const TemplateText = () => {
    useTemplatePage();

    const pageProps = useSelector(selectStorePageProps);

    // render the template
    return (
        <LayoutSmoothScroll>
            <LayoutHeader isFixed={false} />
            <div className={styles.template_text}>
                <LayoutWrapper>
                    <LayoutBreadCrumbs />
                    <div className={styles.wrap}>
                        <div className={styles.content}>
                            <TextContent html={pageProps.document.content} />
                            <div className="clear" />
                        </div>
                    </div>
                </LayoutWrapper>
            </div>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateText;
