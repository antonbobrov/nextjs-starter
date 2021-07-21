import { Application } from 'vevet';
import isBrowser from './utils/browser/isBrowser';

const app = isBrowser ? new Application() : false;
export default app;
