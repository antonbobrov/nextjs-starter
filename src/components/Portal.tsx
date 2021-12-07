import {
    FC, useEffect, useMemo, useState,
} from 'react';
import ReactDOM from 'react-dom';

interface Props {
    parent?: Element;
}

const Portal: FC<Props> = ({
    children,
    parent,
}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const el = useMemo(() => (typeof document !== 'undefined' ? document.createElement('div') : undefined), []);
    useEffect(() => {
        const target = parent && parent.appendChild ? parent : document.body;
        if (el) {
            target.appendChild(el);
        }
        return () => {
            if (el) {
                target.removeChild(el);
            }
        };
    }, [el, parent]);

    return (!!el && mounted) ? ReactDOM.createPortal(children, el) : <></>;
};

export default Portal;
