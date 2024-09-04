import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { IFormCoreInputProps } from './types';

export const FormCoreInputTelephone = forwardRef<
  HTMLInputElement,
  IFormCoreInputProps
>(({ name, type, onChange, ...props }, ref) => (
  <IMaskInput
    {...(props as any)}
    inputRef={ref}
    name={name}
    type={type}
    onAccept={(value: any) => {
      onChange?.({ target: { name, value } } as unknown as any);
    }}
    mask="+{7} (000) 000-00-00"
    prepare={(appended, masked) => {
      if (appended === '8' && masked.value === '') {
        return '';
      }

      if (
        appended.startsWith('8') &&
        appended.length >= 11 &&
        masked.value.length === 0
      ) {
        return appended.replace(/^8/, '7');
      }

      return appended;
    }}
  />
));

FormCoreInputTelephone.displayName = 'FormCoreInputTelephone';
