import dynamic from 'next/dynamic';
import LayoutHead from '../components/layout/head/Head';
import type { ITemplateBase } from './placeholder';
import Header from '../components/layout/header/Header';

const Empty = dynamic(import('./Empty'), {
    ssr: true,
});
const Home = dynamic(import('./home/Home'), {
    ssr: true,
});

const RenderTemplate = (
    props: ITemplateBase,
) => {
    const { template } = props;

    /**
     * Get template to render
     */
    function renderTemplate () {
        switch (template) {
            case 'home':
                return <Home {...props as any} />;
            default:
                return <Empty {...props as any} />;
        }
    }

    return (
        <>
            <LayoutHead {...props} />
            <div className="app" id="app">
                <Header {...props} />
                {renderTemplate()}
            </div>
        </>
    );
};

export default RenderTemplate;
