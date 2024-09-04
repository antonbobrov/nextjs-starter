import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from './types';
import { FormBaseInput } from '../../base/BaseInput';
import { validateInputValueByType } from './validate';

export const FormInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      name,
      type = 'text',
      required,
      min,
      max,
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
    const ref = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const { register, formState } = useFormContext();

    const { ref: setRef, ...registered } = register(name, {
      required,
      min,
      max,
      maxLength,
      minLength,
      validate: (val) => {
        const isTypeValid = validateInputValueByType?.(val, type);
        const isCustomValid = customValidate?.(val);

        return isTypeValid && isCustomValid;
      },
      value,
      onChange,
      onBlur,
      disabled,
    });

    const error = formState.errors[name];
    const isError = !!error;

    return (
      <FormBaseInput
        {...inputProps}
        {...registered}
        ref={(element) => {
          setRef(element);
          ref.current = element;
        }}
        type={type}
        isError={isError}
        errorText={error ? `${error?.message}` : undefined}
      />
    );
  },
);

FormInput.displayName = 'FormInput';
