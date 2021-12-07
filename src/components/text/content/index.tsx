import { useEffect, useRef } from 'react';
import { selectAll, createElement, insertAfter } from 'vevet-dom';
import styles from './styles.module.scss';

interface Props {
    html: string;
}

const TextContent = ({
    html,
}: Props) => {
    const parentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (parentRef.current) {
            const el = parentRef.current;
            wrapIframes(el);
            wrapVideos(el);
            wrapImages(el);
        }
    }, [parentRef]);



    /**
     * Wrap iframes into a div
     */
    function wrapIframes (
        outer: HTMLElement,
    ) {
        const className = styles.iframe;
        const iframes = selectAll('iframe', outer);
        iframes.forEach((iframe) => {
            const parent = iframe.parentElement;
            if (parent) {
                if (!parent.classList.contains(className)) {
                    const wrapper = createElement('div', {
                        class: className,
                    });
                    insertAfter(wrapper, iframe);
                    wrapper.appendChild(iframe);
                }
            }
        });
    }

    /**
     * Wrap videos into a div
     */
    function wrapVideos (
        outer: HTMLElement,
    ) {
        const className = styles.video;
        const videos = selectAll('video', outer);
        videos.forEach((video) => {
            const parent = video.parentElement;
            if (parent) {
                if (!parent.classList.contains(className)) {
                    const wrapper = createElement('div', {
                        class: className,
                    });
                    insertAfter(wrapper, video);
                    wrapper.appendChild(video);
                }
            }
        });
    }

    /**
     * Wrap images into a div
     */
    function wrapImages (
        outer: HTMLElement,
    ) {
        const className = styles.image;
        const images = selectAll('img', outer);
        images.forEach((image) => {
            if (
                image.getAttribute('style') == null
                && image.getAttribute('width') == null
                && image.getAttribute('height') == null
                && image.getAttribute('align') == null
            ) {
                const parent = image.parentElement;
                if (parent) {
                    if (!parent.classList.contains(className)) {
                        const wrapper = createElement('div', {
                            class: className,
                        });
                        insertAfter(wrapper, image);
                        wrapper.appendChild(image);
                    }
                }
            }
        });
    }



    return (
        <div
            className={styles.container}
            ref={parentRef}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default TextContent;
