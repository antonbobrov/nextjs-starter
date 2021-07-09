import Link from 'next/link';
import styles from './Home.module.scss';
import IResPage from '../types';

const HomeTemplate = ({
    title,
}: IResPage) => (
    <div className={styles.home}>
        <div className="wrap">
            <h1>
                {title}
            </h1>
            <Link href="/test/fgfghh/hh?hi=hello">Test link</Link>
        </div>
    </div>
);

export default HomeTemplate;
