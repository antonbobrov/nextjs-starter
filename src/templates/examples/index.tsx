import { FC, useEffect } from 'react';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import ItemsScrollList from '../../components/content/item-scroll-list';
import styles from './styles.module.scss';
import getH1 from '../../utils/data/getH1';
import SplitText from '../../components/content/split-text';
import { BaseTemplateData } from '../../types/page';



export interface ExamplesTemplateData extends BaseTemplateData {
    template: 'examples';
}



const TextPageTemplate: FC<BaseTemplateData> = (
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
                    <div className="wrap v-view_b">

                        <h1>{getH1(props)}</h1>
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
