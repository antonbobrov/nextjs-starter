import { GeneralTypes, utils } from 'vevet';
import { getAppPage } from '../../app';

interface Data {
    scrollTop: number;
    scrollLeft: number;
}

export default function onPageScroll (
    callback: (
        data: Data
    ) => void,
): GeneralTypes.IRemovable {
    const page = getAppPage();
    if (page) {
        let selector: any;
        if (page.smoothScroll) {
            selector = page.smoothScroll;
        } else {
            selector = window;
        }
        return utils.listeners.onScroll(selector, (data) => {
            callback(data);
        });
    }
    throw new Error('The page is not created yet');
}
