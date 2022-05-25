import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import TextH1 from '@/components/text/h1';
import LayoutWrapper from '@/components/layout/wrapper';
import LayoutFooter from '@/components/layout/footer';
import { VFC } from 'react';
import styles from './styles.module.scss';
import useTemplatePage from '../useTemplatePage';

export interface TemplateNotFoundProps {

}

const TemplateNotFound: VFC = () => {
    useTemplatePage();

    // render the template
    return (
        <LayoutSmoothScroll>
            <LayoutWrapper>
                <div className={styles.wrap}>
                    <h1><TextH1 /></h1>
                </div>
            </LayoutWrapper>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateNotFound;
