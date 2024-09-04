import { FC, useMemo, useState } from 'react';
import { useEvent } from '@anton.bobrov/react-hooks';
import { TransitionRouterContext, TTransitionRouterContext } from './context';
import { IProps } from './types';

export const TransitionRouter: FC<IProps> = ({
  onLeave: onLeaveProp,
  onEnter: onEnterProp,
  children,
}) => {
  const [stage, setStage] = useState<TTransitionRouterContext['stage']>('none');

  const onLeave = useEvent(() => {
    setStage('leave');

    return onLeaveProp();
  });

  const onEnter = useEvent(() => {
    setStage('enter');

    return new Promise<void>((resolve, reject) => {
      onEnterProp()
        .then(() => {
          setStage('none');
          resolve();
        })
        .catch(() => {
          setStage('none');
          reject();
        });
    });
  });

  const value = useMemo(
    () => ({
      stage,
      setStage,
      onEnter,
      onLeave,
    }),
    [onEnter, onLeave, stage],
  );

  return (
    <TransitionRouterContext.Provider value={value}>
      {children}
    </TransitionRouterContext.Provider>
  );
};
