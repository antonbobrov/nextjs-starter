/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BaseModal } from '@anton.bobrov/react-components';
import { useEvent } from '@anton.bobrov/react-hooks';
import { Button } from '@/components/ui/Button';
import { Form as FormComponent } from '@/components/form/hook-form';
import { FormInput } from '@/components/form/hook-form/Input';
import { FormCheckbox } from '@/components/form/hook-form/Checkbox';
import { FormTextarea } from '@/components/form/hook-form/Textarea';

export const Form: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const form = useForm({ mode: 'all' });
  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState('');

  const reset = useEvent(() => {
    form?.reset();
    setEmail('');
  });

  return (
    <FormComponent
      form={form}
      action="/api/form/test"
      onSuccess={() => {
        setIsSuccess(true);
        reset();
      }}
    >
      <div ref={containerRef} tabIndex={0}>
        <FormInput label="Your name" name="name" required minLength={2} />

        <br />

        <FormInput
          label="Your email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />

        <FormInput label="Upload a file" type="file" name="file" />

        <br />

        <FormTextarea
          label="Your comment"
          name="comment"
          required
          minLength={5}
        />

        <br />

        <FormCheckbox label="Agree to terms" name="agree" required />

        <br />

        <Button
          tag="button"
          type="submit"
          text="Send"
          disabled={form.formState.isSubmitting}
        />
      </div>

      <BaseModal
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          containerRef.current?.focus();
        }}
        isRestoreFocusOnClose={false}
      >
        <div style={{ padding: '20px', background: '#fff', color: '#000' }}>
          Success!
        </div>
      </BaseModal>
    </FormComponent>
  );
};
