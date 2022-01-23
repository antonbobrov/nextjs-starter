import { DependencyList, useEffect } from 'react';
import app from 'src/app';

export function useOnPageLoadedHook (
    effect: () => (void | (() => void)),
    deps?: DependencyList,
) {
    useEffect(
        () => {
            let unsubscribe: (() => void) | undefined | void;
            const promise = app.onPageLoaded();
            promise.then(() => {
                unsubscribe = effect();
            }).catch(() => {});
            return () => {
                promise.cancel();
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
}

export function useOnPageCreatedHook (
    effect: () => (void | (() => void)),
    deps?: DependencyList,
) {
    useEffect(
        () => {
            let unsubscribe: (() => void) | undefined | void;
            const promise = app.onPageCreated();
            promise.then(() => {
                unsubscribe = effect();
            }).catch(() => {});
            return () => {
                promise.cancel();
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
}

export function useOnPageShownHook (
    effect: () => (void | (() => void)),
    deps?: DependencyList,
) {
    useEffect(
        () => {
            let unsubscribe: (() => void) | undefined | void;
            const promise = app.onPageShown();
            promise.then(() => {
                unsubscribe = effect();
            }).catch(() => {});
            return () => {
                promise.cancel();
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
}
