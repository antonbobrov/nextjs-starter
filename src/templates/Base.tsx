import Link from 'next/link';
import LayoutHead from './Head';
import HomeTemplate from './home/Home';
import IResPage from './types';

const BaseTemplate = (
    props: IResPage,
) => {
    const { template } = props;

    /**
     * Get template to render
     */
    function renderTemplate () {
        switch (template) {
            case 'home':
                return <HomeTemplate {...props} />;
            default:
                return (
                    <>
                        <h1>No template for this page</h1>
                        <p style={{
                            fontSize: '1.25rem',
                        }}
                        >
                            Check console
                            <br />
                            <br />
                            <Link href="/">Go home</Link>
                            {/* {
                                // eslint-disable-next-line no-console
                                console.log('Data for this page: ', props)
                            } */}
                        </p>
                    </>
                );
        }
    }

    return (
        <>
            <LayoutHead {...props} />
            <div className="page" id="page">
                {renderTemplate()}
            </div>
        </>
    );
};

export default BaseTemplate;
