import { DeepRequired } from 'ts-essentials';
import { ILexicon } from './types';

const lexicon: DeepRequired<ILexicon> = {
  siteName: 'Next.js Starter',
  copyright: '© Copyright',

  navigation: {
    close: 'Close',
    breadcrumbs: 'Breadcrumbs',
  },

  menu: {
    open: 'Menu',
    close: 'Close',
  },
};

export default lexicon;
