import { GetServerSideProps } from 'next';
import fetch from 'node-fetch';
import { getEnvUrlApiPage, getEnvUrlBase } from '../src/utils/env';

const Sitemap = () => {};
export default Sitemap;

interface URLItem {
    loc: string;
    lastmod: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { res } = context;

    let resources = '';
    if (process.env.IS_REAL_API === 'true') {
        const apiUrl = new URL(getEnvUrlApiPage());
        apiUrl.searchParams.set('requireSiteMap', 'true');
        const results = await fetch(apiUrl);
        const json = await results.json() as URLItem[];
        if (Array.isArray(json)) {
            resources += json.map((item) => `
                <url>
                    <loc>${getEnvUrlBase(item.loc)}</loc>
                    <lastmod>${item.lastmod}</lastmod>
                </url>
            `).join('');
        }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${resources}
        </urlset>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};
