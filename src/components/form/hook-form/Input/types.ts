import { Message, ValidateResult, ValidationRule } from 'react-hook-form';
import { IFormBaseInputProps } from '../../base/BaseInput/types';

export interface IProps extends Omit<IFormBaseInputProps, 'required'> {
  validate?: (value: string) => ValidateResult;
  required?: Message | ValidationRule<boolean>;
}
