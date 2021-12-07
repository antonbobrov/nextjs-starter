import { useEffect } from 'react';
import { TemplateProps } from '@/types/page';
import store from '@/store/store';
import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import LayoutHeader from '@/components/layout/header';
import LayoutWrapper from '@/components/layout/wrapper';
import LayoutFooter from '@/components/layout/footer';
import LayoutBreadCrumbs from '@/components/layout/breadcrumbs';
import TextH1 from '@/components/text/h1';
import VideoPopupTrigger from '@/components/video/popup/trigger';
import LazyImage from '@/components/image/lazy';
import VideoPopupFullsizeTrigger from '@/components/video/popup/fullsize-trigger';
import PopupSimpleTrigger from '@/components/popup/simple/Trigger';
import styles from './styles.module.scss';
import ExampleScrollList from './components/scroll-list';
import ExamplesSplitText from './components/split-text';

export interface TemplateExamplesProps extends TemplateProps {
    template: 'examples';
}

const TemplateExamples = () => {
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
                <LayoutBreadCrumbs />
                <div className={styles.examples_page}>
                    <div className="wrap">

                        <h1><TextH1 /></h1>

                        {/* scroll list */}
                        <div className={styles.section}>
                            <h2 className={styles.section__header}>
                                Horizontal scroll list
                            </h2>
                            <div className={styles.section__content}>
                                <ExampleScrollList />
                            </div>
                        </div>

                        {/* video popup */}
                        <div className={styles.section}>
                            <h2 className={styles.section__header}>
                                Video Popup
                            </h2>
                            <div className={styles.section__content}>
                                <VideoPopupTrigger
                                    source="yt"
                                    id="BHACKCNDMW8"
                                >
                                    <button type="button">Play YouTube video</button>
                                </VideoPopupTrigger>
                                <span>&nbsp;</span>
                                <VideoPopupTrigger
                                    source="vm"
                                    id="601518684"
                                >
                                    <button type="button">Play Vimeo video</button>
                                </VideoPopupTrigger>
                                <span>&nbsp;</span>
                                <VideoPopupTrigger
                                    source="mp4"
                                    src="/lorem/video.mp4"
                                >
                                    <button type="button">Play MP4 video</button>
                                </VideoPopupTrigger>
                                <br />
                                <br />
                                <div className={styles.mini_placeholder}>
                                    <LazyImage
                                        usePlaceholder
                                        src="https://picsum.photos/400/600"
                                        alt="test image"
                                    />
                                    <VideoPopupFullsizeTrigger
                                        source="yt"
                                        id="BHACKCNDMW8"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* simple popup */}
                        <div className={styles.section}>
                            <h2 className={styles.section__header}>
                                Simple Popup
                            </h2>
                            <div className={styles.section__content}>
                                <PopupSimpleTrigger
                                    trigger={
                                        <button type="button">Show the popup</button>
                                    }
                                >
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </PopupSimpleTrigger>
                            </div>
                        </div>

                        {/* lazy image */}
                        <div className={styles.section}>
                            <h2 className={styles.section__header}>
                                Responive lazy image
                            </h2>
                            <div className={styles.section__content}>
                                <div className={styles.mini_placeholder}>
                                    <LazyImage
                                        usePlaceholder
                                        src="https://picsum.photos/id/240/500"
                                        srcSet="
                                            https://picsum.photos/id/240/500 500w,
                                            https://picsum.photos/id/241/1280 1280w,
                                            https://picsum.photos/id/242/1680
                                        "
                                        alt="test image"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* split text */}
                        <div className={styles.section}>
                            <h2 className={styles.section__header}>
                                Split text
                            </h2>
                            <div className={styles.section__content}>
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
            </LayoutWrapper>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateExamples;
