import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import cn from 'classnames';
import { IFormBaseCheckboxProps } from './types';
import styles from './styles.module.scss';

export const FormBaseCheckbox = forwardRef<
  HTMLInputElement,
  IFormBaseCheckboxProps
>(
  (
    {
      className,
      style,
      name,
      label,
      id: idProp,
      isError,
      errorId: errorIdProp,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const generatedId = useId();
    const id = idProp || generatedId;

    const errorId = errorIdProp || `${id}-error`;

    return (
      <label
        className={cn(
          className,
          styles.form_base_checkbox,
          isError && styles.is_error,
        )}
        htmlFor={id}
      >
        <input
          {...props}
          ref={ref}
          name={name}
          type="checkbox"
          id={id}
          aria-invalid={isError}
          aria-describedby={isError ? errorId : undefined}
        />

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <rect x="0.5" y="0.5" width="23" height="23" stroke="currentColor" />

          <path
            d="M18 7.5L10.5 16.5L6 12"
            stroke="var(--color-white)"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>

        <span dangerouslySetInnerHTML={{ __html: label }} />
      </label>
    );
  },
);

FormBaseCheckbox.displayName = 'FormBaseCheckbox';
