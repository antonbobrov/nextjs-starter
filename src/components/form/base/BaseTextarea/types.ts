import { TextareaHTMLAttributes } from 'react';

export interface IFormBaseTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  isError?: boolean;
  errorId?: string;
  errorText?: string;
}
