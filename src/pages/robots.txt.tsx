import { GetServerSideProps } from 'next';
import { url } from '@/utils/url';

const Robots = () => {};
export default Robots;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, req } = context;

  const content: string[] = [];
  content.push('User-agent: *');
  if (process.env.SEARCHABLE !== 'true') {
    content.push('Disallow: /');
  } else {
    content.push('Disallow: *?*');
    content.push(`Sitemap: ${url.getHost(req, '/sitemap.xml')}`);
  }

  res.setHeader('Content-Type', 'text/plain');
  res.write(content.join('\n'));
  res.end();

  return {
    props: {},
  };
};
