import { InputHTMLAttributes } from 'react';

export interface IFormCoreInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}
