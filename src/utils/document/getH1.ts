import { ITemplateBase } from '../../templates/placeholder';

function getH1 (prop: ITemplateBase) {
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
