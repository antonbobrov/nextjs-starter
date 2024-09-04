import { Message, ValidateResult, ValidationRule } from 'react-hook-form';
import { IFormBaseTextareaProps } from '../../base/BaseTextarea/types';

export interface IProps extends Omit<IFormBaseTextareaProps, 'required'> {
  validate?: (value: string) => ValidateResult;
  required?: Message | ValidationRule<boolean>;
}
