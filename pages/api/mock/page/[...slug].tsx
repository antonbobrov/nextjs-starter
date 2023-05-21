import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { IPage } from '@/types/Page';
import { INotFound } from '@/templates/NotFound/types';
import { PAGE_GLOBAL } from '@/mock/PAGE_GLOBAL';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DeepRequired<IPage<INotFound>>>
) => {
  res.status(404).json({
    global: {
      ...PAGE_GLOBAL,
      meta: {
        ...PAGE_GLOBAL.meta,
        pagetitle: 'Page Not Found',
      },
    },

    templateName: 'not-found',
    template: {},
  });
};
export default handler;
