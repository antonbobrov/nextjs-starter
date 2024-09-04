import { forwardRef } from 'react';
import { IFormCoreInputProps } from './types';
import { FormCoreInputTelephone } from './Telephone';

export const FormCoreInput = forwardRef<HTMLInputElement, IFormCoreInputProps>(
  ({ type, ...props }, ref) => {
    if (type === 'tel') {
      return <FormCoreInputTelephone {...props} ref={ref} type={type} />;
    }

    return <input {...props} ref={ref} type={type} />;
  },
);

FormCoreInput.displayName = 'FormCoreInput';
