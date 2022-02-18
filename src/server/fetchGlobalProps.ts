import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';
import { DeepRequired } from 'ts-essentials';
import { GlobalProps } from '@/types/page';
import serverEnv from './env';

export default async function fetchGlobalProps (
    req: NextApiRequest | IncomingMessage,
) {
    const documentDataUrl = serverEnv.getReqUrlBase(req, '/api/page/__global/');
    const document = await (await fetch(documentDataUrl)).json() as DeepRequired<GlobalProps>;
    return document;
}
