import { useEffect } from 'react';
import store from '@/store/store';
import { TemplateProps } from '@/types/page';
import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import LayoutHeader from '@/components/layout/header';
import TextH1 from '@/components/text/h1';
import LayoutWrapper from '@/components/layout/wrapper';
import LayoutFooter from '@/components/layout/footer';
import styles from './styles.module.scss';

export interface TemplateNotFoundProps extends TemplateProps {
    data: {};
}

const TemplateNotFound = () => {
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
                <div className={styles.not_found_page}>
                    <div className="wrap">
                        <h1><TextH1 /></h1>
                    </div>
                </div>
            </LayoutWrapper>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateNotFound;
