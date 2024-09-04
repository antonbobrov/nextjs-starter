import { IFormInputbox } from '../Box/types';
import { IFormBaseTextAreaProps } from '../BaseTextArea/types';

export interface IFormTextAreaProps
  extends IFormBaseTextAreaProps,
    Pick<IFormInputbox, 'label'> {}
