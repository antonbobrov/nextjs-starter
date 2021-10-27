import { useContext, useEffect } from 'react';
import PageDesc from '../../components/content/page-desc';
import styles from './styles.module.scss';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import { BaseTemplateData } from '../../types/page';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import PageContext from '../../store/PageContext';
import H1Text from '../../components/content/h1/H1Text';



export interface HomeTemplateData extends BaseTemplateData {
    data: {};
}



const HomeTemplate = () => {
    const props = useContext(PageContext);

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
            <div className={styles.home_page}>
                <Header isFixed={false} />
                <div className="page-content">

                    <div className="wrap">
                        <h1 className="v-view_b">
                            <H1Text />
                        </h1>
                        <PageDesc />
                    </div>

                </div>
            </div>
            <Footer />
        </LayoutSmoothScroll>
    );
};

export default HomeTemplate;
