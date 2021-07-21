import getBasePlaceholder, { ITemplateBase } from '../placeholder';

export interface ITemplateHome extends ITemplateBase {
    template: 'home';
}

export default function getPlaceholder (
    url: URL,
): ITemplateHome {
    return {
        ...getBasePlaceholder(url),
        title: 'Home Page',
        template: 'home',
    };
}
