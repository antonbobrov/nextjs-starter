import { useEffect } from 'react';
import { TemplateProps } from '@/types/page';
import store from '@/store/store';
import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import LayoutHeader from '@/components/layout/header';
import TextH1 from '@/components/text/h1';
import TextPageDesc from '@/components/text/page-desc';
import LayoutFooter from '@/components/layout/footer';
import LayoutWrapper from '@/components/layout/wrapper';
import styles from './styles.module.scss';

export interface TemplateHomeProps extends TemplateProps {
    data: {};
}

const TemplateHome = () => {
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
                <div className={styles.home_page}>
                    <div className="wrap">
                        <h1 className="v-view_b">
                            <TextH1 />
                        </h1>
                        <TextPageDesc />
                    </div>
                </div>
            </LayoutWrapper>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateHome;
