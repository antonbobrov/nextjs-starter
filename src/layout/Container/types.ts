import { IComponent } from '@/types/Component';

export interface IProps extends IComponent {
  hasTopSpacing?: boolean;
  hasContentTopSpacing?: boolean;
  hasFooter?: boolean;
}
