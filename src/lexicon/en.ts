import { LexiconData } from 'src/lexicon/types';
import { DeepRequired } from 'ts-essentials';

const lexicon: DeepRequired<LexiconData> = {
    siteName: 'Next.JS Vevet Starter',

    navClose: 'Close',
    playVideo: 'Play video',
    showMenu: 'Show menu',
    hideMenu: 'Hide menu',

    copyright: 'Copyright © {year}',
};
export default lexicon;
