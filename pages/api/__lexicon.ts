import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { LexiconData } from '@/types/lexicon';

export default function handler (
    req: NextApiRequest,
    res: NextApiResponse<
        DeepRequired<LexiconData>
    >,
) {
    const lexicon: DeepRequired<LexiconData> = {
        siteName: 'Next.JS Vevet Starter',

        navClose: 'Close',
        playVideo: 'Play video',
        showMenu: 'Show menu',
        hideMenu: 'Hide menu',

        copyright: 'Copyright © {year}',
    };

    // create an sql string for ModX contexts
    if (
        typeof req.query.toModxContext !== 'undefined'
        && typeof req.query.ctx === 'string'
    ) {
        const contexts = req.query.ctx.split(',');
        if (contexts.length > 0) {
            let sqlString = '';
            Object.entries(lexicon).forEach((item) => {
                const [key, value] = item;
                if (!['siteName'].includes(key)) {
                    sqlString += contexts.map((ctx) => `
                    INSERT IGNORE INTO \`modx_context_setting\` 
                    (
                        \`context_key\`, 
                        \`key\`, 
                        \`value\`, 
                        \`xtype\`, 
                        \`namespace\`, 
                        \`area\`, 
                        \`editedon\`
                    ) 
                    VALUES (
                        '${ctx}', 
                        'site_lexicon_${key}', 
                        '${value}', 
                        'textfield',
                        'site_lexicon', 
                        'site_lexicon', 
                        NULL
                    );
                `).join('');
                }
            });
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(sqlString as any);
            res.end();
            return;
        }
    }

    // return plain lexicon
    res.json(lexicon);
}
