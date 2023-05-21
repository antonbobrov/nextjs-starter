import { IComponent } from '@/types/Component';
import { ILinkMenu } from '@/types/Link';

export interface IProps extends IComponent {
  links: ILinkMenu[];
}
