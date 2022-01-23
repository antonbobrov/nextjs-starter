import { useOnPageCreatedHook } from '@/utils/hooks/vevet';
import {
    Children, cloneElement, DetailedReactHTMLElement,
    FC, HTMLAttributes, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import app from 'src/app';
import { GeneralTypes, NCallbacks } from 'vevet';
import styles from './styles.module.scss';

interface Props extends HTMLAttributes<any> {
    animation?: 'alpha' | 'bottom' | undefined;
    viewClassName?: string;
    viewedClassName?: string;
    handleIn?: () => void;
    handleOut?: () => void;
}

const LayoutScrollView: FC<Props> = ({
    animation = undefined,
    viewClassName = 'view',
    viewedClassName = 'viewed',
    handleIn,
    handleOut,
    children,
}) => {
    const [isViewed, setIsViewed] = useState<undefined | boolean>(undefined);
    let animationClass = '';
    if (animation === 'bottom') {
        animationClass = styles.bottom;
    } else if (animation === 'alpha') {
        animationClass = styles.alpha;
    }

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

    useOnPageCreatedHook(() => {
        const scrollViewCallbacks: NCallbacks.AddedCallback[] = [];
        let scrollViewObserver: GeneralTypes.IRemovable | undefined;
        if (!!app.page && domRef.current) {
            const { scrollView } = app.page;
            if (scrollView) {
                scrollViewCallbacks.push(scrollView.addCallback('in', (data) => {
                    if (data === domRef.current) {
                        setIsViewed(true);
                    }
                }));
                scrollViewCallbacks.push(scrollView.addCallback('out', (data) => {
                    if (data === domRef.current) {
                        setIsViewed(false);
                    }
                }));
                scrollViewObserver = scrollView.addElement(domRef.current);
            }
        }
        return () => {
            scrollViewObserver?.remove();
            scrollViewCallbacks.forEach((callback) => {
                callback.remove();
            });
        };
    }, [domRef]);

    return (
        <>
            {cloneElement(child, {
                className: [
                    child.props.className,
                    animationClass,
                    isViewed ? styles.viewed : '',
                    viewClassName,
                    isViewed ? viewedClassName : '',
                ].join(' '),
                ref: domRef,
            })}
        </>
    );
};
export default LayoutScrollView;
