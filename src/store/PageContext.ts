import { createContext } from 'react';
import { TemplateProps } from '@/types/page';

const PageContext = createContext<TemplateProps>(undefined as any);
export default PageContext;
