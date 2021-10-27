import { useContext, useEffect } from 'react';
import AppPage from '../app/AppPage';
import H1Text from '../components/content/h1/H1Text';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
import LayoutSmoothScroll from '../components/layout/smooth-scroll';
import PageContext from '../store/PageContext';

const EmptyTemplate = () => {
    const props = useContext(PageContext);

    // create page instance
    useEffect(() => {
        const page = new AppPage({
            name: props.template,
        });
        page.create();
        return () => {
            page.hide().then(() => {
                page.destroy();
            }).catch(() => {});
        };
    }, []);

    return (
        <>
            <LayoutSmoothScroll>
                <Header isFixed={false} />
                <div className="page-content">
                    <div className="wrap">
                        <br />
                        <h1><H1Text /></h1>
                        <br />
                        <br />
                        <h2>No template for this page</h2>
                        <br />
                    </div>
                </div>
                <Footer />
            </LayoutSmoothScroll>
        </>
    );
};

export default EmptyTemplate;
