import Link from 'next/link';
import { FC } from 'react';
import PageDesc from '../components/layout/page-desc';
import { BaseTemplateData } from '../types/page';

const EmptyTemplate: FC<BaseTemplateData> = (
    props,
) => (
    <div className="page-content">
        <div className="wrap">
            <h1>No template for this page</h1>
            <PageDesc {...props} />
            <br />
            <br />
            <Link href="/">Go home</Link>
        </div>
    </div>
);

export default EmptyTemplate;
