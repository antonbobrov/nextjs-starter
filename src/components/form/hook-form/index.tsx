import { isString, useDomId, useEvent } from '@anton.bobrov/react-hooks';
import { useEffect } from 'react';
import {
  FieldValues,
  FormProvider,
  FormSubmitHandler,
  Form as HookForm,
} from 'react-hook-form';
import store from '@/store/redux/store';
import { loadingSlice } from '@/store/redux/reducers/loading';
import { IFormProps, IFormResponse } from './types';

export const Form = <
  T extends FieldValues,
  U extends FieldValues | undefined = undefined,
>({
  form,
  className,
  style,
  action,
  method = 'post',
  onSuccess: onSuccessProp,
  onError: onErrorProp,
  resetOnSuccess,
  children,
  ...props
}: IFormProps<T, U>) => {
  const id = useDomId();

  const { setError, formState, reset } = form;
  const { isSubmitting } = formState;

  // callbacks
  const onSuccess = useEvent(onSuccessProp);
  const onError = useEvent(onErrorProp);

  // loading state
  useEffect(() => {
    if (isSubmitting) {
      store.dispatch(loadingSlice.actions.start(id));
    } else {
      store.dispatch(loadingSlice.actions.end(id));
    }

    return () => {
      store.dispatch(loadingSlice.actions.end(id));
    };
  }, [id, isSubmitting]);

  /** Process any response */
  const processErrors = useEvent(async (response: Response | undefined) => {
    try {
      const json = (await response?.json()) as IFormResponse;

      const errorsObject = json.errors ?? {};
      const errorKeys = Object.keys(errorsObject);

      errorKeys.forEach((key) => {
        const error = errorsObject[key];

        const errorText = isString(error)
          ? error
          : error.map((v) => v).join('; ');

        setError(key, {
          type: 'manual',
          message: errorText,
        });
      });

      onError?.(json);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  });

  /** Handle success */
  const handleSuccess = useEvent(async (response: Response | undefined) => {
    const json = (await response?.json()) as any;
    onSuccess?.(json);

    if (resetOnSuccess) {
      reset();
    }
  });

  /** Fix file inputs */
  const onSubmit: FormSubmitHandler<FieldValues> = useEvent(
    async ({ formData }) => {
      const fileInputs = Array.from(
        document.querySelectorAll(`#${id} input[type="file"]`) ?? [],
      ) as HTMLInputElement[];

      fileInputs.forEach((fileInput) => {
        const inputName = fileInput.name;

        formData.delete(inputName);

        Array.from(fileInput.files ?? []).forEach((file) =>
          formData.append(inputName, file),
        );
      });
    },
  );

  return (
    <FormProvider {...form}>
      <HookForm
        {...props}
        className={className}
        style={style}
        id={id}
        action={action}
        method={method}
        onSuccess={(data) => handleSuccess(data.response)}
        onError={(data) => processErrors(data.response)}
        control={form.control as any}
        onSubmit={onSubmit}
      >
        {children}
      </HookForm>
    </FormProvider>
  );
};
