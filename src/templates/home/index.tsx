import { FC, useEffect } from 'react';
import PageDesc from '../../components/layout/page-desc';
import styles from './styles.module.scss';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import { BaseTemplateData } from '../../types/page';
import H1Text from '../../components/layout/text/H1Text';
import Header from '../../components/layout/header';



export interface HomeTemplateData extends BaseTemplateData {
    template: 'home';
}



const HomeTemplate: FC<HomeTemplateData> = (
    props,
) => {
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
            <div className={styles.page}>
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
        </LayoutSmoothScroll>
    );
};

export default HomeTemplate;
