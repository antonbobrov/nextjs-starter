import { GeneralTypes, NCallbacks } from 'vevet';
import app, { getAppPage } from 'src/app';

export default function onInView (
    el: Element,
    inCallback: () => void,
): GeneralTypes.IRemovable {
    const promise = app.onPageShown();
    let event: NCallbacks.AddedCallback | undefined;

    promise.then(() => {
        if (el.classList.contains('viewed')) {
            inCallback();
        } else {
            const page = getAppPage();
            if (page) {
                if (page.scrollView) {
                    event = page.scrollView?.addCallback('in', (data) => {
                        if (el === data) {
                            inCallback();
                            if (event) {
                                event.remove();
                            }
                        }
                    });
                    if (page.shown) {
                        page.scrollView.updateElements();
                    }
                }
            }
        }
    });

    return {
        remove: () => {
            promise.cancel();
            if (event) {
                event.remove();
            }
        },
    };
}
