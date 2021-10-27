import { FC, useEffect } from 'react';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import styles from './styles.module.scss';
import { BaseTemplateData } from '../../types/page';
import VideoPopupButton from '../../components/video/video-popup-button';
import Header from '../../components/layout/header';
import SimplePopup from '../../components/popup/simple-popup';
import Footer from '../../components/layout/footer';
import H1Text from '../../components/content/h1/H1Text';
import BreadCrumbs from '../../components/layout/breadcrumbs';
import ExampleScrollList from './components/scroll-list';
import LazyImage from '../../components/image/lazy-image';
import ExamplesSplitText from './components/split-text';



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
            <div className={styles.examples_page}>
                <Header isFixed={false} />
                <div className="page-content">
                    <BreadCrumbs />
                    <div className="wrap v-view_b">

                        <h1>
                            <H1Text />
                        </h1>

                        {/* scroll list */}
                        <div className={styles.examples_page_section}>
                            <h2 className={styles.examples_page_section__header}>
                                Horizontal scroll list
                            </h2>
                            <div className={styles.examples_page_section__content}>
                                <ExampleScrollList />
                            </div>
                        </div>

                        {/* video popup */}
                        <div className={styles.examples_page_section}>
                            <h2 className={styles.examples_page_section__header}>
                                Video Popup
                            </h2>
                            <div className={styles.examples_page_section__content}>
                                <VideoPopupButton
                                    source="yt"
                                    id="BHACKCNDMW8"
                                >
                                    <button type="button">Play YouTube video</button>
                                </VideoPopupButton>
                                <span>&nbsp;</span>
                                <VideoPopupButton
                                    source="vm"
                                    id="601518684"
                                >
                                    <button type="button">Play Vimeo video</button>
                                </VideoPopupButton>
                                <span>&nbsp;</span>
                                <VideoPopupButton
                                    source="mp4"
                                    src="/lorem/video.mp4"
                                >
                                    <button type="button">Play MP4 video</button>
                                </VideoPopupButton>
                            </div>
                        </div>

                        {/* simple popup */}
                        <div className={styles.examples_page_section}>
                            <h2 className={styles.examples_page_section__header}>
                                Simple Popup
                            </h2>
                            <div className={styles.examples_page_section__content}>
                                <SimplePopup
                                    trigger={
                                        <button type="button">Show the popup</button>
                                    }
                                >
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </SimplePopup>
                            </div>
                        </div>

                        {/* lazy image */}
                        <div className={styles.examples_page_section}>
                            <h2 className={styles.examples_page_section__header}>
                                Responive lazy image
                            </h2>
                            <div className={styles.examples_page_section__content}>
                                <div className={styles.examples_page__mini_placeholder}>
                                    <LazyImage
                                        usePlaceholder
                                        src="https://picsum.photos/id/240/500"
                                        srcSet="
                                            https://picsum.photos/id/240/500 500w,
                                            https://picsum.photos/id/241/1280 1280w,
                                            https://picsum.photos/id/242/1680
                                        "
                                    />
                                </div>
                            </div>
                        </div>

                        {/* split text */}
                        <div className={styles.examples_page_section}>
                            <h2 className={styles.examples_page_section__header}>
                                Split text
                            </h2>
                            <div className={styles.examples_page_section__content}>
                                <h6>
                                    <ExamplesSplitText>
                                        Lorem ipsum
                                        <br />
                                        Slor sit amet.
                                    </ExamplesSplitText>
                                </h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </LayoutSmoothScroll>
    );
};

export default TextPageTemplate;
