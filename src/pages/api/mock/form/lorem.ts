import { IFormResponse } from '@/components/Form/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeepRequired<IFormResponse>>
) {
  // 200 status for succes, 422 for error
  // res.status(422);

  res.json({
    message: 'Will not work',
    errors: {
      email: ['Invalid email', 'Wrong domain'],
    },
  });
}
