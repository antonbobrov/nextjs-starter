import { FC, useEffect, useState } from 'react';
import { CustomCursor as VevetCursor } from 'vevet';
import app, { useCustomCursor } from '../../../app';

let windowCursor: VevetCursor | undefined;
export function getCursor () {
    return windowCursor;
}

interface Data {
    container?: Window | Element | string;
}

const CustomCursor: FC<Data> = ({
    container,
}) => {
    const [pageShown, setPageShown] = useState(false);

    useEffect(() => {
        if (app) {
            app.onPageShown().then(() => {
                setPageShown(true);
            });
        }
    }, []);

    useEffect(() => {
        if (!pageShown || !useCustomCursor) {
            return () => {};
        }
        const cursor = new VevetCursor({
            container: container || window,
            run: false,
        });
        if (cursor.container === window) {
            windowCursor = cursor;
        }
        cursor.enable();
        return () => {
            if (cursor) {
                cursor.destroy();
            }
        };
    }, [pageShown]);

    return (
        <></>
    );
};


export default CustomCursor;
