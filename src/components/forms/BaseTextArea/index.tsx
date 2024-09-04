import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { IFormBaseTextAreaProps } from './types';
import styles from './styles.module.scss';

export const FormBaseTextArea = forwardRef<
  HTMLTextAreaElement,
  IFormBaseTextAreaProps
>(
  (
    {
      className,
      style,
      name,
      id: idProp,
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

    const generatedId = useId();
    const id = idProp || generatedId;

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
      <textarea
        {...inputProps}
        {...registered}
        ref={(element) => {
          setRef(element);
          ref.current = element;
        }}
        className={cn(className, styles.base_textarea)}
        style={style}
        id={id}
        aria-invalid={isError}
      />
    );
  },
);

FormBaseTextArea.displayName = 'FormBaseTextArea';
