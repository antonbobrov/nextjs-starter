import { TemplateProps } from '@/types/page';
import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import LayoutHeader from '@/components/layout/header';
import TextH1 from '@/components/text/h1';
import TextPageDesc from '@/components/text/page-desc';
import LayoutFooter from '@/components/layout/footer';
import LayoutWrapper from '@/components/layout/wrapper';
import LayoutScrollView from '@/components/layout/scroll-view';
import styles from './styles.module.scss';
import useTemplatePage from '../useTemplatePage';

export interface TemplateHomeProps extends TemplateProps {
    data: {};
}

const TemplateHome = () => {
    useTemplatePage();

    // render the template
    return (
        <LayoutSmoothScroll>
            <LayoutHeader isFixed={false} />
            <div className={styles.template_home}>
                <LayoutWrapper>
                    <main className={styles.wrap}>
                        <LayoutScrollView viewClassName="v-view_b">
                            <h1>
                                <TextH1 />
                            </h1>
                        </LayoutScrollView>
                        <TextPageDesc />
                    </main>
                </LayoutWrapper>
            </div>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateHome;
