import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import styles from './styles.module.scss';
import { FormInputBox } from '../Box';
import { IFormInputProps } from './types';
import { FormBaseInput } from '../BaseInput';

export const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  (
    { className, style, id: idProp, label, name, ...inputProps },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const generatedId = useId();
    const id = idProp || generatedId;
    const errorId = useId();

    const { formState } = useFormContext();

    const error = formState.errors[name];
    const isError = !!error;

    return (
      <FormInputBox
        className={cn(className, styles.form_input)}
        style={style}
        id={id}
        label={label}
        isError={isError}
        errorId={errorId}
        error={error}
      >
        <FormBaseInput
          ref={ref}
          {...inputProps}
          id={id}
          name={name}
          className={cn(styles.input, isError && styles.is_error)}
          aria-describedby={isError ? errorId : undefined}
        />
      </FormInputBox>
    );
  },
);

FormInput.displayName = 'FormInput';
