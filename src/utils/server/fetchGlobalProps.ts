import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';
import { DeepRequired } from 'ts-essentials';
import { GlobalProps } from '@/types/page';
import env from '../env';

export default async function fetchGlobalProps (
    req: NextApiRequest | IncomingMessage,
) {
    const documentDataUrl = env.getReqUrlBase(req, '/api/__base/');
    const document = await (await fetch(documentDataUrl)).json() as DeepRequired<GlobalProps>;
    return document;
}
