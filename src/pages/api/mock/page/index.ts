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
    template: {
      components: [
        {
          key: 0,
          componentName: 'HomeIntro',
          props: {
            title: 'Home Page',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
          children: null,
        },
        {
          key: 1,
          componentName: 'HomeAbout',
          props: {
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
          children: [
            {
              key: 0,
              componentName: 'HomeLink',
              props: {
                name: 'Read more',
                href: 'https://google.com',
                isExternal: true,
              },
              children: null,
            },
          ],
        },
      ],
    },
  });
};

export default handler;
