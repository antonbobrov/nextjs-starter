import cn from 'classnames';
import { forwardRef } from 'react';
import { useFormInput } from 'react-form-states';
import { useForwardedRef } from '@anton.bobrov/react-hooks';
import styles from './styles.module.scss';
import { IInputProps } from './types';

export const FormInput = forwardRef<HTMLInputElement, IInputProps>(
  ({ inputProps, formStore, className, style }, forwardedRef) => {
    const inputRef = useForwardedRef(forwardedRef);

    const inputHandler = useFormInput({
      inputRef,
      formStore,
      styles,
    });

    const classNames = cn(inputHandler?.classNames);

    return (
      <span
        className={cn(styles.form_input, classNames, className)}
        style={style}
      >
        <input
          ref={inputRef}
          {...inputProps}
          className={cn(styles.input, inputProps.className, classNames)}
        />
      </span>
    );
  }
);

FormInput.displayName = 'FormInput';
