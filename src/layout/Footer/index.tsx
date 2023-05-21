import { forwardRef, useEffect } from 'react';
import cn from 'classnames';
import { IComponent } from '@/types/Component';
import { useStoreLexicon } from '@/store/reducers/lexicon';
import { useClientSize, useForwardedRef } from '@anton.bobrov/react-hooks';
import { vevet } from '@anton.bobrov/vevet-init';
import { LayoutWrap } from '../Wrap';
import styles from './styles.module.scss';

export const Footer = forwardRef<HTMLDivElement, IComponent>(
  ({ className, style }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);

    const { copyright } = useStoreLexicon();

    const { clientHeight } = useClientSize(ref);

    useEffect(() => {
      if (clientHeight > 0) {
        vevet.html.style.setProperty('--footer-height', `${clientHeight}px`);
      }
    }, [clientHeight]);

    return (
      <footer ref={ref} className={cn(styles.footer, className)} style={style}>
        <LayoutWrap>{copyright}</LayoutWrap>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
