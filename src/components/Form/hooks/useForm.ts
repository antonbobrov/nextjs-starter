import { loadingSlice } from '@/store/reducers/loading';
import store from '@/store/store';
import { useEffect, useId, useState } from 'react';
import { createFormStore, useFormHandler } from 'react-form-states';
import { utils, vevet } from '@anton.bobrov/vevet-init';
import { useLiteInteraction } from '@anton.bobrov/react-hooks';
import { usePageScrollSelector } from '@anton.bobrov/react-components';

type TProps = Omit<Parameters<typeof useFormHandler>[0], 'formStore'> & {
  scrollToError?: boolean;
};

export function useForm({
  formRef,
  onStart,
  onFinish,
  onSuccess,
  onError,
  scrollToError,
  ...props
}: TProps) {
  const formStore = createFormStore();
  const id = useId();
  const scrollSelector = usePageScrollSelector();

  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const formHandler = useFormHandler({
    ...props,
    formRef,
    formStore,
    onStart() {
      store.dispatch(loadingSlice.actions.start(id));
      onStart?.();
    },
    onFinish() {
      store.dispatch(loadingSlice.actions.end(id));
      onFinish?.();
    },
    onSuccess: (data) => {
      onSuccess?.(data);
      setIsSuccess(true);
    },
    onError: (data) => {
      onError?.(data);

      setErrors(
        Object.fromEntries(
          data.errors?.map(({ name, message }) => [name, message]) || []
        )
      );
    },
  });

  useLiteInteraction(formRef, () => setErrors({}));

  // scroll to error
  useEffect(() => {
    if (!scrollToError || !scrollSelector) {
      return;
    }

    const keys = Object.keys(errors);
    const firstKey = keys?.[0];

    if (!firstKey) {
      return;
    }

    const firstErrorElement = formRef.current?.querySelector(
      `*[name="${firstKey}"]`
    );

    if (!firstErrorElement) {
      return;
    }

    utils.scroll.toElement({
      el: firstErrorElement,
      container: scrollSelector,
      duration: 250,
      top: vevet.viewport.height / 3,
    });
  }, [errors, formRef, scrollSelector, scrollToError]);

  return {
    formStore,
    formHandler,
    id,
    isSuccess,
    errors,
    isLoading: formHandler.isLoading,
  };
}
