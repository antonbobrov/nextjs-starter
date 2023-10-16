import { FC, PropsWithChildren } from 'react';
import {
  LinkClickInterceptor,
  PageScroll,
  ScrollView,
  TLinkClickInterceptorHandler,
} from '@anton.bobrov/react-components';
import { useRouter } from 'next/router';
import { useEvent } from '@anton.bobrov/react-hooks';
import { useStoreLayout } from '@/store/reducers/layout';
import { useStoreConfig } from '@/store/reducers/config';
import { BreadcrumbsJSON } from './Breadcrumbs/JSON';
import { Preloader } from './Preloader';
import { Header } from './Header';
import { MenuModal } from './MenuModal';
import { LayoutRouterCurtain } from './RouterCurtain';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { key } = useStoreConfig();
  const { isFirstLoaded, isPageVisible, isPageReady } = useStoreLayout();

  const router = useRouter();

  const onInternalLinkClick: TLinkClickInterceptorHandler = useEvent(
    (event, element) => {
      if (event.defaultPrevented) {
        return;
      }

      event.preventDefault();
      router.push(element.href, element.href);
    }
  );

  return (
    <LinkClickInterceptor onInternalClick={onInternalLinkClick}>
      <PageScroll.Provider smoothProps={{ enabled: isPageVisible }}>
        <PageScroll.ScrollBar resizeKey={isPageReady ? key : undefined}>
          <ScrollView.Provider
            instanceKey={key}
            isEnabled={isFirstLoaded && isPageVisible}
          >
            <Preloader />

            <BreadcrumbsJSON />
            <Header />

            {children}

            <MenuModal />

            <LayoutRouterCurtain />
          </ScrollView.Provider>
        </PageScroll.ScrollBar>
      </PageScroll.Provider>
    </LinkClickInterceptor>
  );
};
