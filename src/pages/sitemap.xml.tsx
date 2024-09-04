import { ISitemapURL } from '@/types/Sitemap';
import { getApiFetchURL } from '@/utils/server/helpers/getApiFetchURL';
import { getBaseURL } from '@/utils/server/helpers/getBaseUrl';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const Page: FC = () => null;

export default Page;

async function fetchSitemap() {
  const fetchUrl = getApiFetchURL('sitemap');

  const results = await fetch(fetchUrl.href);
  const urls = (await results.json()) as ISitemapURL[];

  return urls;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;

  const urls = await fetchSitemap();

  const resources = urls.map(
    (item) => `
      <url>
        <loc>${getBaseURL(item.loc)}</loc>
        ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
      </url>
    `,
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${resources.join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
