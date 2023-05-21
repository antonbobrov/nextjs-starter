import { RouterCurtainHandler } from './Handler';
import styles from './styles.module.scss';

let handler: RouterCurtainHandler | undefined;
function create() {
  if (!handler) {
    const wrapper = document.createElement('div');
    wrapper.classList.add(styles.router_curtain);
    document.body.appendChild(wrapper);
    handler = new RouterCurtainHandler(wrapper);
  }

  return handler;
}

/**
 * Show the router curtain
 */
export function showRouterCurtain() {
  return new Promise<void>((resolve, reject) => {
    create().show().then(resolve).catch(reject);
  });
}

/**
 * Hide the router curtain
 */
export function hideRouterCurtain() {
  return new Promise<void>((resolve, reject) => {
    create().hide().then(resolve).catch(reject);
  });
}
