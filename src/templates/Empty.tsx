import PageDesc from '../components/layout/page-desc/PageDesc';
import { TemplateBaseData } from './_base/types';

const EmptyTemplate = (
    prop: TemplateBaseData,
) => (
    <div className="page-content">
        <div className="wrap">
            <h1>No template for this page</h1>
            <PageDesc {...prop} />
            <br />
            <br />
            <a href="/">Go home</a>
        </div>
    </div>
);

export default EmptyTemplate;
