import { HTMLInputTypeAttribute } from 'react';
import { ValidateResult } from 'react-hook-form';

export function validateInputValueByType(
  value: string,
  type: HTMLInputTypeAttribute
): ValidateResult {
  if (value === '') {
    return true;
  }

  if (type === 'email') {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }

  return true;
}
