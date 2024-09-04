import { forwardRef, useImperativeHandle, useRef } from 'react';
import cn from 'classnames';
import { useDomId } from '@anton.bobrov/react-hooks';
import styles from './styles.module.scss';
import { IFormBaseInputProps } from './types';
import { FormCoreInput } from '../CoreInput';

export const FormBaseInput = forwardRef<HTMLInputElement, IFormBaseInputProps>(
  (
    {
      className,
      style,
      name,
      label,
      type,
      id: idProp,
      isError,
      errorId: errorIdProp,
      errorText,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const generatedId = useDomId();
    const id = idProp || generatedId;

    const errorId = errorIdProp || `${id}-error`;

    return (
      <div className={cn(className, styles.form_base_input)}>
        <label className={styles.label} htmlFor={id}>
          <span className={styles.text}>{label}</span>

          <span className={cn(styles.input, isError && styles.is_error)}>
            <FormCoreInput
              {...props}
              ref={ref}
              type={type}
              name={name}
              id={id}
              aria-invalid={type === 'hidden' ? undefined : isError}
              aria-describedby={isError ? errorId : undefined}
            />
          </span>
        </label>

        {errorText && (
          <p id={errorId} className={styles.error}>
            {errorText}
          </p>
        )}
      </div>
    );
  },
);

FormBaseInput.displayName = 'FormBaseInput';
