import { Message, ValidateResult, ValidationRule } from 'react-hook-form';
import { IFormBaseCheckboxProps } from '../../base/BaseCheckbox/types';

export interface IProps extends Omit<IFormBaseCheckboxProps, 'required'> {
  validate?: (value: string) => ValidateResult;
  required?: Message | ValidationRule<boolean>;
}
