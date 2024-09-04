import { FC, PropsWithChildren, useMemo } from 'react';
import { PageScroll, ScrollView } from '@anton.bobrov/react-components';
import { useStoreLayout } from '@/store/redux/reducers/layout';
import { usePage } from '@/store/page/hooks';
import { useRouter } from 'next/router';
import { vevet } from 'vevet';
import { BreadcrumbsJSON } from './Breadcrumbs/JSON';
import { Preloader } from './Preloader';
import { Header } from './Header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isFirstLoaded } = useStoreLayout();
  const page = usePage();

  const { pathname } = useRouter();

  const scrollViewInstance = useMemo(
    () => pathname + JSON.stringify(page),
    [page, pathname],
  );

  return (
    <PageScroll.Provider
      getType={() => (vevet.isMobile ? 'native' : 'custom')}
      customScrollProps={{ isEnabled: isFirstLoaded }}
    >
      <PageScroll.ScrollBar resizeKey={undefined} canAutoHide={false} />

      <Preloader />

      <BreadcrumbsJSON />

      <Header />

      <ScrollView.Provider
        instanceKey={scrollViewInstance}
        isEnabled={isFirstLoaded}
        maxDelay={700}
      >
        {children}
      </ScrollView.Provider>

      {/* todo: router curtain */}
    </PageScroll.Provider>
  );
};
