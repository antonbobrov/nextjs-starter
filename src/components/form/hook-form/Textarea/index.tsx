import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from './types';
import { FormBaseTextarea } from '../../base/BaseTextarea';

export const FormTextarea = forwardRef<HTMLTextAreaElement, IProps>(
  (
    {
      name,
      required,
      maxLength,
      minLength,
      validate: customValidate,
      value,
      onChange,
      onBlur,
      disabled,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const { register, formState } = useFormContext();

    const { ref: setRef, ...registered } = register(name, {
      required,
      maxLength,
      minLength,
      validate: (val) => {
        const isCustomValid = customValidate?.(val);

        return isCustomValid;
      },
      value,
      onChange,
      onBlur,
      disabled,
    });

    const error = formState.errors[name];
    const isError = !!error;

    return (
      <FormBaseTextarea
        {...inputProps}
        {...registered}
        ref={(element) => {
          setRef(element);
          ref.current = element;
        }}
        isError={isError}
        errorText={error ? `${error?.message}` : undefined}
      />
    );
  },
);

FormTextarea.displayName = 'FormTextarea';
