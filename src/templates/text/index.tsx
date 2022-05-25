import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import TextContent from '@/components/text/content';
import LayoutFooter from '@/components/layout/footer';
import LayoutWrapper from '@/components/layout/wrapper';
import { useSelector } from 'react-redux';
import { VFC } from 'react';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import LayoutBreadCrumbsList from '@/components/layout/breadcrumbs/list';
import styles from './styles.module.scss';
import useTemplatePage from '../useTemplatePage';

export interface TemplateTextProps {

}

const TemplateText: VFC = () => {
    useTemplatePage();

    const globalProps = useSelector(selectPagePropsGlobal);

    // render the template
    return (
        <LayoutSmoothScroll>
            <div className={styles.template_text}>
                <LayoutWrapper>
                    <LayoutBreadCrumbsList />
                    <div className={styles.wrap}>
                        <div className={styles.content}>
                            <TextContent
                                html={globalProps.document.content}
                            />
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
