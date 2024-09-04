import { FC, useEffect } from 'react';
import { useStoreLoading } from '@/store/redux/reducers/loading';
import styles from './styles.module.scss';

export const LoadingIndicator: FC = () => {
  const { ids } = useStoreLoading();

  const isLoading = ids.length > 0;

  useEffect(() => {
    document.documentElement.classList.toggle(
      styles.loading_indicator,
      isLoading,
    );
  }, [isLoading]);

  return null;
};
