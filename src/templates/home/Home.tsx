import Link from 'next/link';
import styles from './Home.module.scss';
import type { ITemplateHome } from './placeholder';

const HomeTemplate = ({
    title,
}: ITemplateHome) => (
    <div className="page-content">
        <div className={styles.home}>

            <div className="wrap">
                <h1>
                    {title}
                </h1>
                <br />
                <Link href="/test/fgfghh/hh?hi=hello">Test link</Link>
            </div>

        </div>
    </div>
);

export default HomeTemplate;
