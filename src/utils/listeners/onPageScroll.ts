import { GeneralTypes, utils } from 'vevet';
import { getAppPage } from 'src/app';

interface CallbackData {
    scrollTop: number;
    scrollLeft: number;
}

interface Props {
    passive?: boolean;
}

export default function onPageScroll (
    callback: (
        data: CallbackData
    ) => void,
    props?: Props,
): GeneralTypes.IRemovable {
    const page = getAppPage();
    if (page) {
        let selector: any;
        if (page.smoothScroll) {
            selector = page.smoothScroll;
        } else {
            selector = window;
        }
        return utils.listeners.onScroll({
            container: selector,
            callback,
            isPassive: props?.passive,
        });
    }
    throw new Error('The page is not created yet');
}
