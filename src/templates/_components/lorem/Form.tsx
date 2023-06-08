import { ButtonSimple } from '@/components/Button/Simple';
import { FormInput } from '@/components/Form/Input/Input';
import { Heading } from '@/components/Typography/Heading';
import { FC, useRef, useState } from 'react';
import { FormTextArea } from '@/components/Form/Input/TextArea';
import { useForm } from '@/components/Form/hooks/useForm';

export const Form: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [progress, setProgress] = useState(0);

  const { formStore, id, isLoading, isSuccess } = useForm({
    formRef,
    onProgress: setProgress,
    scrollToError: true,
    resetOnSuccess: true,
  });

  return (
    <form
      ref={formRef}
      method="POST"
      action="/api/forms/form"
      encType="multipart/form-data"
    >
      <FormInput
        inputProps={{
          name: 'name',
          type: 'text',
          id: `${id}form-name`,
          placeholder: 'Name Field',
          minLength: 2,
        }}
        formStore={formStore}
      />
      <br />

      <FormInput
        inputProps={{
          name: 'email',
          type: 'email',
          id: `${id}form-email`,
          placeholder: 'Email Field',
        }}
        formStore={formStore}
      />
      <br />

      <FormTextArea
        inputProps={{
          name: 'comment',
          id: `${id}form-comment`,
          placeholder: 'Comment Field',
        }}
        formStore={formStore}
      />
      <br />

      <FormInput
        inputProps={{
          name: 'file',
          type: 'file',
          id: `${id}form-file`,
          placeholder: 'File Field',
        }}
        formStore={formStore}
      />
      <br />

      <ButtonSimple
        tag="button"
        type="submit"
        text="Send"
        disabled={isLoading}
      />

      <p>Progress: {(progress * 100).toFixed(0)}%</p>
      {isSuccess && <Heading variant={6}>Success</Heading>}
    </form>
  );
};
