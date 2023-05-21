import { FC, PropsWithChildren } from 'react';
import {
  LinkClickInterceptor,
  PageScroll,
  ScrollView,
  TLinkClickInterceptorHandler,
} from '@anton.bobrov/react-components';
import { useStoreLayout } from '@/store/reducers/layout';
import { useStoreConfig } from '@/store/reducers/config';
import { useRouter } from 'next/router';
import { useEvent } from '@anton.bobrov/react-hooks';
import { BreadcrumbsJSON } from './Breadcrumbs/JSON';
import { Preloader } from './Preloader';
import { Header } from './Header';
import { MenuModal } from './MenuModal';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { key } = useStoreConfig();
  const { isFirstLoaded, isVisible } = useStoreLayout();

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
      <PageScroll.Provider smoothProps={{ enabled: isVisible }}>
        <PageScroll.ScrollBar resizeKey={key}>
          <ScrollView.Provider
            instanceKey={key}
            isEnabled={isFirstLoaded && isVisible}
          >
            <Preloader />

            <BreadcrumbsJSON />
            <Header />

            {children}

            <MenuModal />
          </ScrollView.Provider>
        </PageScroll.ScrollBar>
      </PageScroll.Provider>
    </LinkClickInterceptor>
  );
};
