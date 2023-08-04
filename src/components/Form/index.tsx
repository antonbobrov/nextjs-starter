import { isString, useEvent } from '@anton.bobrov/react-hooks';
import { useEffect, useId, useRef } from 'react';
import { FieldValues, FormProvider, Form as HookForm } from 'react-hook-form';
import { usePageScrollSelector } from '@anton.bobrov/react-components';
import { utils, vevet } from '@anton.bobrov/vevet-init';
import store from '@/store/store';
import { loadingSlice } from '@/store/reducers/loading';
import { IFormProps, IFormResponse } from './types';

export const Form = <
  T extends FieldValues,
  U extends FieldValues | undefined = undefined
>({
  form,
  className,
  style,
  action,
  method = 'post',
  onSuccess: onSuccessProp,
  onError: onErrorProp,
  resetOnSuccess,
  scrollToError,
  scrollSelector: scrollSelectorProp,
  children,
  ...props
}: IFormProps<T, U>) => {
  const id = useId();

  const currentScrollSelector = usePageScrollSelector();
  const scrollSelector = scrollSelectorProp || currentScrollSelector;

  const { setError, formState, reset } = form;
  const { isSubmitting } = formState;

  const containerRef = useRef<HTMLDivElement>(null);

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

  const scrollToFirstError = useEvent((errorKeys: string[]) => {
    const container = containerRef.current;
    if (!scrollSelector || !container) {
      return;
    }

    const elements = errorKeys
      .map((key) => {
        const element = container.querySelector(`*[name="${key}"]`);
        if (!element) {
          return null;
        }

        return {
          element,
          bounding: element.getBoundingClientRect(),
        };
      })
      .filter(Boolean);

    if (elements.length === 0) {
      return;
    }

    const topElement = elements.sort(
      (a, b) => a!.bounding.top - b!.bounding.top
    )[0]!;

    utils.scroll.toElement({
      el: topElement.element,
      container: scrollSelector,
      duration: 250,
      top: vevet.viewport.height / 3,
    });
  });

  /** Process any response */
  const processErrors = useEvent(async (response: Response | undefined) => {
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

    if (scrollToError) {
      scrollToFirstError(errorKeys);
    }
  });

  /** Handle success */
  const handleSuccess = useEvent(() => {
    onSuccess?.();

    if (resetOnSuccess) {
      reset();
    }
  });

  return (
    <FormProvider {...form}>
      <div ref={containerRef} className={className} style={style}>
        <HookForm
          {...props}
          action={action}
          method={method}
          onSuccess={handleSuccess}
          onError={(data) => processErrors(data.response)}
          control={form.control as any}
        >
          {children}
        </HookForm>
      </div>
    </FormProvider>
  );
};
