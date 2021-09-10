import { useEffect, useState } from 'react';
import { CustomCursor as VevetCursor } from 'vevet';
import app, { useCustomCursor } from '../../../app';

let cursor: VevetCursor | undefined;
export function getCursor () {
    return cursor;
}

const CustomCursor = () => {
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
        cursor = new VevetCursor({
            run: false,
        });
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
