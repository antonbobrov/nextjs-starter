import { IFormCoreInputProps } from '../CoreInput/types';

export interface IFormBaseInputProps extends IFormCoreInputProps {
  label: string;
  isError?: boolean;
  errorId?: string;
  errorText?: string;
}
