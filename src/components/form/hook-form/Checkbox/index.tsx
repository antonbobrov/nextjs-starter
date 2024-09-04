import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { isBoolean } from '@anton.bobrov/react-hooks';
import { IProps } from './types';
import { FormBaseCheckbox } from '../../base/BaseCheckbox';

export const FormCheckbox = forwardRef<HTMLInputElement, IProps>(
  (
    { name, required, onChange, onBlur, checked, disabled, ...inputProps },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const { register, formState, setValue } = useFormContext();

    const { ref: setRef, ...registered } = register(name, {
      required,
      onChange: isBoolean(checked) ? undefined : onChange,
      onBlur,
      disabled,
    });

    useEffect(() => {
      if (!isBoolean(checked)) {
        return;
      }

      setValue(name, checked);
    }, [checked, name, setValue]);

    const error = formState.errors[name];
    const isError = !!error;

    return (
      <FormBaseCheckbox
        {...inputProps}
        {...registered}
        ref={(element) => {
          setRef(element);
          ref.current = element;
        }}
        isError={isError}
      />
    );
  },
);

FormCheckbox.displayName = 'FormCheckbox';
