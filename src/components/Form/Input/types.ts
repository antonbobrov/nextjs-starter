import { IFormInputbox } from '../Box/types';
import { IFormBaseInputProps } from '../BaseInput/types';

export interface IFormInputProps
  extends IFormBaseInputProps,
    Pick<IFormInputbox, 'label'> {}
