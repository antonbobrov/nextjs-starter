import { DependencyList, useEffect } from 'react';
import app from 'src/app';
import PCancelable from 'p-cancelable';

export function useOnPageLoadedHook (
    effect: () => (void | (() => void)),
    deps?: DependencyList,
) {
    useEffect(
        () => {
            let destroyed = false;
            let unsubscribe: (() => void) | undefined | void;
            const promise = app.onPageLoaded();
            promise.then(() => {
                if (destroyed) {
                    return;
                }
                unsubscribe = effect();
            }).catch(() => {});
            return () => {
                destroyed = true;
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
            let destroyed = false;
            let unsubscribe: (() => void) | undefined | void;
            const promise = app.onPageCreated();
            promise.then(() => {
                if (destroyed) {
                    return;
                }
                unsubscribe = effect();
            }).catch(() => {});
            return () => {
                destroyed = true;
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
            let destroyed = false;
            let unsubscribe: (() => void) | undefined | void;
            const promise = app.onPageShown();
            promise.then(() => {
                if (destroyed) {
                    return;
                }
                unsubscribe = effect();
            }).catch(() => {});
            return () => {
                destroyed = true;
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

export function useOnPageBeforeShownHook (
    effect: () => (void | (() => void)),
    deps?: DependencyList,
) {
    useEffect(
        () => {
            let destroyed = false;
            let unsubscribe: (() => void) | undefined | void;
            const promises: PCancelable<any>[] = [];

            const onPageCreated = app.onPageCreated();
            promises.push(onPageCreated);
            onPageCreated.then((page) => {
                if (destroyed) {
                    return;
                }
                const onBeforeShow = page.onBeforeShow();
                promises.push(onBeforeShow);
                onBeforeShow.then(() => {
                    if (destroyed) {
                        return;
                    }
                    unsubscribe = effect();
                }).catch(() => {});
            }).catch(() => {});

            return () => {
                destroyed = true;
                promises.forEach((promise) => {
                    promise.cancel();
                });
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
}
