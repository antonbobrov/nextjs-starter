import { useEffect } from 'react';
import { TemplateBaseData } from '../_base/types';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll/LayoutSmoothScroll';
import ItemsScrollList from '../../components/content/item-scroll-list';
import styles from './styles.module.scss';
import getH1 from '../../utils/document/getH1';
import SplitText from '../../components/content/split-text';


export interface ExamplesTemplateData extends TemplateBaseData {
    template: 'examples';
}



const TextPageTemplate = (
    prop: ExamplesTemplateData,
) => {
    // create page instance
    useEffect(() => {
        const page = new AppPage({
            name: prop.template,
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
                    <div className="wrap v-view_b">

                        <h1>{getH1(prop)}</h1>
                        <br />
                        <br />

                        <h2>Horizontal scroll list</h2>
                        <br />
                        <ItemsScrollList />

                        <br />
                        <br />
                        <h2>Split text</h2>
                        <br />
                        <h6>
                            <SplitText>
                                Lorem ipsum
                                <br />
                                Slor sit amet.
                            </SplitText>
                        </h6>

                    </div>
                </div>
            </div>
        </LayoutSmoothScroll>
    );
};

export default TextPageTemplate;
