import { FC } from 'react';
import { PageScroll } from '@anton.bobrov/react-components';
import { LayoutContainer } from '@/components/layout/Container';
import { IHome } from './types';
import { registry } from './registry';
import styles from './styles.module.scss';

const Home: FC<IHome> = ({ components }) => (
  <PageScroll.CustomContainer>
    <LayoutContainer
      hasXPadding={false}
      hasTopPadding={false}
      hasMainTopPadding={false}
    >
      <div className={styles.grid}>
        {registry.render(components, {
          cssModule: styles,
          order: ['HomeIntro'],
        })}
      </div>
    </LayoutContainer>
  </PageScroll.CustomContainer>
);

export default Home;
