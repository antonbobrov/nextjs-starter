import { InputHTMLAttributes } from 'react';

export interface IFormBaseCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  label: string;
  isError?: boolean;
  errorId?: string;
}
