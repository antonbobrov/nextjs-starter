import { FC, PropsWithChildren } from 'react';
import { PageScroll, ScrollView } from '@anton.bobrov/react-components';
import { useStoreLayout } from '@/store/redux/reducers/layout';
import { vevet } from 'vevet';
import { usePageKey } from '@/utils/page/usePageKey';
import { useDebouncedProp } from '@anton.bobrov/react-hooks';
import { BreadcrumbsJSON } from './Breadcrumbs/JSON';
import { Preloader } from './Preloader';
import { Header } from './Header';
import { LoadingIndicator } from './LoadingIndicator';
import { MenuModal } from './MenuModal';
import { TransitionRouterCurtain } from './TransitionRouterCurtain';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isFirstLoaded } = useStoreLayout();

  const pageKey = usePageKey();

  const pageKeyDebounced = useDebouncedProp(pageKey, 500);

  return (
    <TransitionRouterCurtain>
      <PageScroll.Provider
        getType={() => (vevet.isMobile ? 'native' : 'custom')}
        customScrollProps={{ isEnabled: isFirstLoaded }}
      >
        <PageScroll.ScrollBar
          resizeKey={pageKeyDebounced}
          canAutoHide={false}
        />

        <LoadingIndicator />

        <Preloader />

        <BreadcrumbsJSON />

        <Header />

        <MenuModal />

        <ScrollView.Provider
          instanceKey={pageKey}
          isEnabled={isFirstLoaded}
          maxDelay={700}
          states="inout"
        >
          {children}
        </ScrollView.Provider>
      </PageScroll.Provider>
    </TransitionRouterCurtain>
  );
};
