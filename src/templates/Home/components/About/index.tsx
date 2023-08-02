import { FC } from 'react';
import cn from 'classnames';
import { registerComponent } from 'rc-api-registry';
import { ScrollView } from '@anton.bobrov/react-components';
import { RichText } from '@/components/Typography/RichText';
import { IHomeAbout, IProps } from './types';
import styles from './styles.module.scss';

const Component: FC<IProps> = ({ className, style, children, description }) => (
  <div className={cn(className, styles.home_about)} style={style}>
    <ScrollView.Element animation="fadeInUp">
      <RichText
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </ScrollView.Element>

    {children}
  </div>
);

export const HomeAbout = registerComponent<IHomeAbout>()(
  Component,
  'HomeAbout'
);
