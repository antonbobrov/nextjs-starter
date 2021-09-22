import { createContext } from 'react';
import { BaseTemplateData } from '../types/page';

const PageContext = createContext<BaseTemplateData>(undefined as any);
export default PageContext;
