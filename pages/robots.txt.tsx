import { GetServerSideProps } from 'next';
import { getEnvUrlBase } from '../src/utils/env';

const Robots = () => {};
export default Robots;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { res } = context;

    const content: string[] = [];
    content.push('User-agent: *');
    if (typeof process.env.NEXT_PUBLIC_NOINDEX === 'undefined' || process.env.NEXT_PUBLIC_NOINDEX === 'true') {
        content.push('Disallow: /');
    } else {
        content.push('Disallow: *?*');
        content.push(`Sitemap: ${getEnvUrlBase('/sitemap.xml')}`);
    }

    res.setHeader('Content-Type', 'text/plain');
    res.write(content.join('\n'));
    res.end();

    return {
        props: {},
    };
};
