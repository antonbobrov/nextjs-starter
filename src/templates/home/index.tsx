import { FC, useEffect } from 'react';
import PageDesc from '../../components/layout/page-desc';
import getH1 from '../../utils/data/getH1';
import styles from './styles.module.scss';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import { BaseTemplateData } from '../../types/page';



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
                <div className="page-content">

                    <div className="wrap">
                        <h1 className="v-view_b">
                            {getH1(props)}
                        </h1>
                        <PageDesc {...props} />
                    </div>

                </div>
            </div>
        </LayoutSmoothScroll>
    );
};

export default HomeTemplate;
