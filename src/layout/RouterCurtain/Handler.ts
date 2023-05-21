import { Timeline } from '@anton.bobrov/vevet-init';
import { settings } from './settings';

export class RouterCurtainHandler {
  private _timeline?: Timeline;

  private _progress: number;

  constructor(private readonly _parent: HTMLElement) {
    this._progress = 0;
  }

  /**
   * Show the scene
   */
  public show() {
    return this._toggle(true);
  }

  /**
   * Hide the scene
   */
  public hide() {
    return this._toggle(false);
  }

  /**
   * Toggle scene appearance
   */
  private _toggle(bool: boolean) {
    return new Promise<void>((resolve) => {
      this._timeline?.destroy();
      this._timeline = new Timeline({ duration: settings.duration });

      this._timeline.addCallback('progress', ({ easing }) => {
        this._progress = bool ? easing : 1 - easing;
        this._render();
      });
      this._timeline.addCallback('end', () => resolve());

      this._timeline.play();
    });
  }

  /**
   * Render the scene
   */
  protected _render() {
    const progress = this._progress;

    this._parent.style.display = progress > 0 ? 'block' : 'none';
    this._parent.style.opacity = `${progress}`;
  }

  /**
   * Destroy the scene
   */
  public destroy() {
    this._timeline?.destroy();
    this._timeline = undefined;
  }
}
