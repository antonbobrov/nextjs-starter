/* eslint-disable promise/no-nesting */
import { forwardRef, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IProps } from './types';
import { TransitionRouterContext } from '../context';

export const TransitionRouterLink = forwardRef<HTMLAnchorElement, IProps>(
  ({ onClick, href, locale, children, ...props }, ref) => {
    const { stage, onLeave, onEnter } = useContext(TransitionRouterContext);

    const router = useRouter();

    return (
      <Link
        {...props}
        ref={ref}
        href={href}
        locale={locale}
        onClick={(event) => {
          onClick?.(event);

          const { target, download } = event.currentTarget;

          if (target || download) {
            return;
          }

          if (stage !== 'none') {
            event.preventDefault();

            return;
          }

          event.preventDefault();

          onLeave()
            .then(() => {
              router
                .push(href, undefined, { locale })
                .then(() => onEnter())
                .catch(() => onEnter());
            })
            .catch(() => {
              router
                .push(href, undefined, { locale })
                .then(() => onEnter())
                .catch(() => onEnter());
            });
        }}
      >
        {children}
      </Link>
    );
  },
);

TransitionRouterLink.displayName = 'TransitionRouterLink';
