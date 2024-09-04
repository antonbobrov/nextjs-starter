import { DeepRequired } from 'ts-essentials';
import { ILexicon } from './types';

const lexicon: DeepRequired<ILexicon> = {
  siteName: 'Next.js Starter',
  copyright: '© Copyright',

  navigation: {
    breadcrumbs: 'Breadcrumbs',
  },

  menu: {
    label: 'Menu',
    open: 'Menu',
    close: 'Close',
  },
};

export default lexicon;
