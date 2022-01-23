import TextH1 from '@/components/text/h1';
import LayoutHeader from '@/components/layout/header';
import LayoutSmoothScroll from '@/components/layout/smooth-scroll';
import LayoutFooter from '@/components/layout/footer';
import LayoutWrapper from '@/components/layout/wrapper';
import { VFC } from 'react';
import useTemplatePage from './useTemplatePage';

const TemplateEmpty: VFC = () => {
    useTemplatePage();

    return (
        <LayoutSmoothScroll>
            <LayoutHeader isFixed={false} />
            <LayoutWrapper>
                <div className="wrap">
                    <br />
                    <br />
                    <h1><TextH1 /></h1>
                    <br />
                    <br />
                    <h2>No template for this page</h2>
                    <br />
                </div>
            </LayoutWrapper>
            <LayoutFooter />
        </LayoutSmoothScroll>
    );
};

export default TemplateEmpty;
