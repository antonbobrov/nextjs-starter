import Link from 'next/link';

const EmptyTemplate = () => (
    <div className="page-content">
        <div className="wrap">
            <h1>No template for this page</h1>
            <br />
            <Link href="/">Go home</Link>
        </div>
    </div>
);

export default EmptyTemplate;
