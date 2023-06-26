import { InputHTMLAttributes } from 'react';
import { ValidateResult } from 'react-hook-form';
import { IFormInputbox } from '../Box/types';

export interface IFormInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Pick<IFormInputbox, 'label'> {
  name: string;
  validate?: (value: string) => ValidateResult;
}
