import normalizers from '@/utils/normalizers';
import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';

function getReqUrlBase (
    req: NextApiRequest | IncomingMessage,
    pathname = '',
) {
    if (process.env.NEXT_PUBLIC_URL_BASE) {
        return normalizers.urlSlashes(`${process.env.NEXT_PUBLIC_URL_BASE}/${pathname}`);
    }
    let url = 'http://localhost:3000/';
    if (req) {
        let protocol = 'https:';
        const host = req.headers['x-forwarded-host'] as string || req.headers.host || 'localhost:3000';
        if (host.includes('localhost') || host.includes('192.168.')) {
            protocol = 'http:';
        }
        url = `${protocol}//${host}/`;
    }
    return normalizers.urlSlashes(`${url}/${pathname}`);
}

const env = {
    getReqUrlBase,
};

export default env;
