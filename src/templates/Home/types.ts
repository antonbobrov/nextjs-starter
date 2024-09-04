import { TRegistryComponentsAPI } from 'rc-api-registry';
import { IPageBase } from '@/types/Page';
import { registry } from './registry';

export interface IHome extends IPageBase {
  templateName: 'Home';
  components: TRegistryComponentsAPI<typeof registry>;
}
