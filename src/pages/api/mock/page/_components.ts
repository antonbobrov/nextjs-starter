import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { IPage } from '@/types/Page';
import { PAGE_GLOBAL } from '@/mock/PAGE_GLOBAL';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DeepRequired<IPage>>
) => {
  res.json({
    global: {
      ...PAGE_GLOBAL,
      meta: {
        ...PAGE_GLOBAL.meta,
        pagetitle: 'Components',
      },
      breadcrumbs: [
        ...PAGE_GLOBAL.breadcrumbs,
        { id: 1, href: '/_components', name: 'Components' },
      ],
    },

    templateName: '_components',
    template: {},
  });
};
export default handler;
