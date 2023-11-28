import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import styles from './styles.module.scss';
import { FormInputBox } from '../Box';
import { FormBaseTextArea } from '../BaseTextArea';
import { IFormTextAreaProps } from './types';

export const FormTextarea = forwardRef<HTMLTextAreaElement, IFormTextAreaProps>(
  (
    { className, style, id: idProp, label, name, ...inputProps },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    const generatedId = useId();
    const id = idProp || generatedId;
    const errorId = useId();

    const { formState } = useFormContext();

    const error = formState.errors[name];
    const isError = !!error;

    return (
      <FormInputBox
        className={cn(className, styles.form_textarea)}
        style={style}
        id={id}
        label={label}
        isError={isError}
        errorId={errorId}
        error={error}
      >
        <FormBaseTextArea
          ref={ref}
          {...inputProps}
          id={id}
          name={name}
          className={cn(styles.textarea, isError && styles.is_error)}
          aria-describedby={isError ? errorId : undefined}
        />
      </FormInputBox>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';
