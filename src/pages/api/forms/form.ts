import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { IFormResponse } from 'react-form-states';
import emailValidator from 'email-validator';
import { isString } from '@anton.bobrov/react-hooks';
import { sendForm } from '@/utils/server/form/sendForm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeepRequired<IFormResponse>>
) {
  const response = await sendForm({
    req,
    subject: 'Contacts Form',
    slug: 'contacts_form',
    fields: [
      {
        name: 'name',
        lexicon: 'Name',
        validate({ value }) {
          if (!isString(value) || value.length < 2) return '';

          return true;
        },
      },
      {
        name: 'email',
        lexicon: 'Email',
        validate({ value }) {
          return emailValidator.validate(value?.toString() || '') || '';
        },
      },
    ],
  });

  res.json(response);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
