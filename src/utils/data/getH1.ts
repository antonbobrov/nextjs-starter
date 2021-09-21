import { BaseTemplateData } from '../../types/page';

function getH1 (prop: BaseTemplateData) {
    const { document } = prop;
    const { description, longtitle, pagetitle } = document;
    if (description) {
        return description;
    }
    if (longtitle) {
        return longtitle;
    }
    if (pagetitle) {
        return pagetitle;
    }
    return '';
}

export default getH1;
