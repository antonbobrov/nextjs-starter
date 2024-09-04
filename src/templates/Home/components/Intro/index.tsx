import { FC, memo } from 'react';
import cn from 'classnames';
import { registerComponent } from 'rc-api-registry';
import { Heading } from '@/components/ui/Typography/Heading';
import { TypedAnimation } from '@/components/animation/TypedAnimation';
import { IHomeIntro, IProps } from './types';
import styles from './styles.module.scss';

const Component: FC<IProps> = ({ className, style, title, description }) => (
  <section className={cn(className, styles.home_intro)} style={style}>
    <TypedAnimation>
      <Heading variant={1} dangerouslySetInnerHTML={{ __html: title }} />
    </TypedAnimation>

    <TypedAnimation kind="fadeInUp">
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </TypedAnimation>
  </section>
);

const MemoComponent = memo(Component);

export const HomeIntro = registerComponent<IHomeIntro>()(
  MemoComponent,
  'HomeIntro',
);
