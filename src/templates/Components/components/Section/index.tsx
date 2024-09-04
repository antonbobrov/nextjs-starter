import { forwardRef, useId, useState } from 'react';
import cn from 'classnames';
import { ExpandContent } from '@anton.bobrov/react-components';
import { IProps } from './types';
import styles from './styles.module.scss';

export const Section = forwardRef<HTMLDivElement, IProps>(
  ({ className, style, title, children }, forwardedRef) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const idSummary = useId();
    const idDetails = useId();

    return (
      <div
        ref={forwardedRef}
        className={cn(styles.section, className)}
        style={style}
      >
        <button
          type="button"
          className={cn(styles.thumb, isExpanded && styles.active)}
          id={idSummary}
          aria-expanded={isExpanded}
          aria-controls={idDetails}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {title}
        </button>

        <div
          role="region"
          id={idDetails}
          aria-labelledby={idSummary}
          aria-hidden={!isExpanded}
        >
          <ExpandContent
            isActive={isExpanded}
            duration={500}
            hasAlpha={false}
            isHiddenContentRendered={false}
          >
            <div className={styles.wrapper}>
              <div className={styles.children}>{children}</div>
            </div>
          </ExpandContent>
        </div>
      </div>
    );
  },
);

Section.displayName = 'Section';
