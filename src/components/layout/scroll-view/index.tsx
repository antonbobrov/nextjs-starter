import {
    Children, cloneElement, DetailedReactHTMLElement,
    FC, HTMLAttributes, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import app from 'src/app';

interface Props {
    viewClassName?: string;
    viewedClassName?: string;
    handleIn?: () => void;
    handleOut?: () => void;
}

const LayoutScrollView: FC<Props> = ({
    viewClassName = 'v-view',
    viewedClassName = 'viewed',
    handleIn,
    handleOut,
    children,
}) => {
    const [isViewed, setIsViewed] = useState<undefined | boolean>(undefined);

    const child = Children.only(children) as DetailedReactHTMLElement<
        HTMLAttributes<HTMLElement>, HTMLElement
    >;
    const domRef = useRef<HTMLElement>(null);
    useImperativeHandle(child.ref as any, () => domRef.current!);

    useEffect(() => {
        if (typeof isViewed !== 'boolean') {
            return;
        }
        if (isViewed) {
            if (handleIn) {
                handleIn();
            }
        } else if (handleOut) {
            handleOut();
        }
    }, [isViewed, viewClassName, viewedClassName, handleIn, handleOut]);

    useEffect(() => {
        const promise = app.onPageCreated();
        promise.then(() => {
            if (!!app.page && domRef.current) {
                const { scrollView } = app.page;
                if (scrollView) {
                    scrollView.addCallback('in', (data) => {
                        if (data === domRef.current) {
                            setIsViewed(true);
                        }
                    });
                    scrollView.addCallback('out', (data) => {
                        if (data === domRef.current) {
                            setIsViewed(false);
                        }
                    });
                    scrollView.addElement(domRef.current);
                }
            }
        }).catch(() => {});
        return () => {
            promise.cancel();
        };
    }, [domRef]);

    return (
        <>
            {cloneElement(child, {
                className: [
                    child.props.className,
                    viewClassName,
                    isViewed ? viewedClassName : '',
                ].join(' '),
                ref: domRef,
            })}
        </>
    );
};
export default LayoutScrollView;
