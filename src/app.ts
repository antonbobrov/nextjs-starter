import { Application } from 'vevet';
import isBrowser from './helpers/browser/isBrowser';

const app = isBrowser ? new Application() : false;
export default app;
