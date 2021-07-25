import { TemplateBaseData } from '../../templates/_base/types';

function getH1 (prop: TemplateBaseData) {
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
