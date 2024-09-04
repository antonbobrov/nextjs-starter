import { FC, memo } from 'react';
import cn from 'classnames';
import { registerComponent } from 'rc-api-registry';
import { TypedAnimation } from '@/components/animation/TypedAnimation';
import { IHomeAbout, IProps } from './types';
import styles from './styles.module.scss';

const Component: FC<IProps> = ({ className, style, description, children }) => (
  <div className={cn(className, styles.home_about)} style={style}>
    <TypedAnimation>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </TypedAnimation>

    {children}
  </div>
);

const MemoComponent = memo(Component);

export const HomeAbout = registerComponent<IHomeAbout>()(
  MemoComponent,
  'HomeAbout',
);
