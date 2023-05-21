import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest } from 'next';
import { IFormResponse } from 'react-form-states';
import { DeepRequired } from 'ts-essentials';
import FormData from 'form-data';
import { isBoolean, removeDublicateSlashes } from '@anton.bobrov/react-hooks';
import { getFormData } from './getFormData';

const MAX_UPLOAD_SIZE = 3 * 1024 * 1024;

interface IProps {
  req: NextApiRequest;
  subject: string;
  slug: string;
  fields: {
    name: string;
    lexicon: string;
    validate: (
      value: string | string[] | undefined,
      name: string,
      lexicon: string
    ) => true | string;
  }[];
}

/**
 * Parse file field and add it to FormData
 */
function addFilesToFormData(
  fieldName: string,
  file: formidable.File,
  formData: FormData
) {
  if (!file.filepath || !file.mimetype || !file.originalFilename) {
    return;
  }
  formData.append(fieldName, fs.readFileSync(file.filepath), {
    contentType: file.mimetype,
    filename: file.originalFilename,
  });
}

/**
 * Send form data
 */
export async function sendForm({
  req,
  subject,
  slug,
  fields: fieldsValidator,
}: IProps) {
  const apiURL = process.env.NEXT_PUBLIC_API;

  const response: DeepRequired<IFormResponse> = {
    success: true,
    errors: [],
    data: {},
  };
  const fields: { key: string; value: string }[] = [];

  const formData = await getFormData(req);
  const { formFields, formFiles } = formData;

  // validate fields
  fieldsValidator.forEach(({ name, lexicon, validate }) => {
    const value = formFields[name];
    const isValid = validate(value, name, lexicon);
    if (isBoolean(isValid) && !!isValid) {
      fields.push({ key: name, value: `${value}` });
    } else {
      response.errors.push({
        name,
        message: isValid || 'The field is invalid',
      });
    }
  });

  // generate form data to send
  const sendData = new FormData();
  sendData.append('subject', subject);
  sendData.append('slug', slug);
  sendData.append('fields', JSON.stringify(fields));
  if (formFiles) {
    Object.entries(formFiles).forEach(([fieldName, fieldValue]) => {
      if (!Array.isArray(fieldValue)) {
        addFilesToFormData(fieldName, fieldValue, sendData);
        if (fieldValue.size > MAX_UPLOAD_SIZE) {
          response.errors.push({
            name: fieldName,
            message: `Max file size must be less than ${
              MAX_UPLOAD_SIZE / 1024 / 1024
            } MB`,
          });
        }
      }
    });
  }

  // check errors
  if (response.errors && response.errors.length > 0) {
    response.success = false;
  }

  // send the message
  if (!!apiURL && response.success) {
    const formResponse = await fetch(
      new URL(removeDublicateSlashes(`${apiURL}/form/send/`)),
      {
        method: 'POST',
        headers: {
          APIKEY: process.env.API_KEY || '',
        },
        body: sendData as any,
      }
    );

    if (formResponse) {
      const jsonResponse = await formResponse.json();

      return jsonResponse;
    }
  }

  return response;
}
