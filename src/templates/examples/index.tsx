import { FC, useEffect } from 'react';
import AppPage from '../../app/AppPage';
import LayoutSmoothScroll from '../../components/layout/smooth-scroll';
import ItemsScrollList from '../../components/content/item-scroll-list';
import styles from './styles.module.scss';
import SplitText from '../../components/content/split-text';
import { BaseTemplateData } from '../../types/page';
import VideoPopupButton from '../../components/video/video-popup-button';
import H1Text from '../../components/layout/text/H1Text';
import Header from '../../components/layout/header';
import LazyImage from '../../components/layout/lazy-image';
import SimplePopup from '../../components/popup/simple-popup';
import Footer from '../../components/layout/footer';



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
                <Header isFixed={false} />
                <div className="page-content">
                    <div className="wrap v-view_b">

                        <h1>
                            <H1Text />
                        </h1>
                        <br />
                        <br />

                        <h2>Horizontal scroll list</h2>
                        <br />
                        <ItemsScrollList />

                        <br />
                        <br />
                        <h2>Video Popup</h2>
                        <br />
                        <VideoPopupButton
                            source="yt"
                            id="BHACKCNDMW8"
                        >
                            <span>Play YouTube video</span>
                        </VideoPopupButton>
                        <span>&nbsp;</span>
                        <VideoPopupButton
                            source="vm"
                            id="601518684"
                        >
                            <span>Play Vimeo video</span>
                        </VideoPopupButton>
                        <span>&nbsp;</span>
                        <VideoPopupButton
                            source="mp4"
                            src="/lorem/video.mp4"
                        >
                            <span>Play MP4 video</span>
                        </VideoPopupButton>

                        <br />
                        <br />
                        <h2>Simple Popup</h2>
                        <br />
                        <SimplePopup
                            trigger={
                                <button type="button" className="plain-button">Show the popup</button>
                            }
                        >
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </SimplePopup>

                        <br />
                        <br />
                        <h2>Responive lazy image</h2>
                        <br />
                        <LazyImage
                            fullsize={false}
                            src="https://picsum.photos/id/240/500"
                            srcSet="
                                https://picsum.photos/id/240/500 500w,
                                https://picsum.photos/id/241/1280 1280w,
                                https://picsum.photos/id/242/1680
                            "
                        />

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
            <Footer />
        </LayoutSmoothScroll>
    );
};

export default TextPageTemplate;
