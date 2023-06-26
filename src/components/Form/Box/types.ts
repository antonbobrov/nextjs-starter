import { IComponent } from '@/types/Component';
import { ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface IFormInputbox extends IComponent {
  children: ReactNode;
  id: string;
  label?: string;
  isError?: boolean;
  errorId: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}
