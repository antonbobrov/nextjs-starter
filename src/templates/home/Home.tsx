import Link from 'next/link';
import { useEffect } from 'react';
import PageDesc from '../../components/layout/page-desc/PageDesc';
import getH1 from '../../utils/document/getH1';
import styles from './Home.module.scss';
import { TemplateBaseData } from '../_base/types';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll/LayoutSmoothScroll';


export interface HomeTemplateData extends TemplateBaseData {
    template: 'home';
}



const HomeTemplate = (
    prop: HomeTemplateData,
) => {
    // create page instance
    useEffect(() => {
        const page = new AppPage({
            name: prop.template,
        });
        page.create();
    });

    // render the template
    return (
        <LayoutSmoothScroll>
            <div className={styles.home}>
                <div className="page-content">

                    <div className="wrap">
                        <h1 className="v-view_b">
                            {getH1(prop)}
                        </h1>
                        <PageDesc {...prop} />
                        <br />
                        <br />
                        <div className="v-view_b">
                            <Link href="/not-existing-page">Test link</Link>
                        </div>
                    </div>

                </div>
            </div>
        </LayoutSmoothScroll>
    );
};

export default HomeTemplate;
