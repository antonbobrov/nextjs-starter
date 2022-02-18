import serverEnv from '@/server/env';
import normalizers from '@/utils/normalizers';
import { GetServerSideProps } from 'next';
import fetch from 'node-fetch';

const Sitemap = () => {};
export default Sitemap;

interface URLItem {
    loc: string;
    lastmod: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, req } = context;

    let resources = '';
    if (process.env.NEXT_PUBLIC_URL_API) {
        const apiUrl = new URL(
            normalizers.urlSlashes(`${process.env.NEXT_PUBLIC_URL_API}/sitemap/`),
        );
        apiUrl.searchParams.set('requireSiteMap', 'true');
        const results = await fetch(apiUrl);
        const json = await results.json() as URLItem[];
        if (Array.isArray(json)) {
            resources += json.map((item) => `
                <url>
                    <loc>${serverEnv.getReqUrlBase(req, item.loc)}</loc>
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
