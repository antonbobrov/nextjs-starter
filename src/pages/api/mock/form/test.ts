import { IFormResponse } from '@/components/form/hook-form/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeepRequired<IFormResponse>>,
) {
  // 200 status for success, 422 for error
  res.status(422);

  res.json({
    errors: {
      email: ['Invalid email', 'Wrong domain'],
      comment: ['Comment is invalid'],
    },
  });
}
