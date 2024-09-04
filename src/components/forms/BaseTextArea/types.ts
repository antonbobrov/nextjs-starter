import { TextareaHTMLAttributes } from 'react';
import { Message, ValidateResult, ValidationRule } from 'react-hook-form';

export interface IFormBaseTextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required'> {
  name: string;
  validate?: (value: string) => ValidateResult;
  required?: Message | ValidationRule<boolean>;
}
