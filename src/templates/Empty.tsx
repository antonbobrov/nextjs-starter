import Link from 'next/link';
import PageDesc from '../components/layout/page-desc';

const EmptyTemplate = () => (
    <div className="page-content">
        <div className="wrap">
            <h1>No template for this page</h1>
            <PageDesc />
            <br />
            <br />
            <Link href="/">Go home</Link>
        </div>
    </div>
);

export default EmptyTemplate;
