import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { IPage } from '@/types/Page';
import { IHome } from '@/templates/Home/types';
import { PAGE_GLOBAL } from '@/mock/PAGE_GLOBAL';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DeepRequired<IPage<IHome>>>
) => {
  res.json({
    global: PAGE_GLOBAL,

    templateName: 'home',
    template: {},
  });
};
export default handler;
