import { useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import AppPage from '../../app/AppPage';
import { BaseTemplateData } from '../../types/page';
import PageContext from '../../store/PageContext';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import H1Text from '../../components/content/h1/H1Text';



export interface NotFoundTemplateData extends BaseTemplateData {
    data: {};
}



const NotFoundTemplate = () => {
    const props = useContext<NotFoundTemplateData>(PageContext);

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
            <div className={styles.not_found_page}>
                <Header isFixed={false} />
                <div className="page-content">

                    <div className="wrap">
                        <h1 className="v-view_b">
                            <H1Text />
                        </h1>
                    </div>

                </div>
            </div>
            <Footer />
        </LayoutSmoothScroll>
    );
};

export default NotFoundTemplate;
