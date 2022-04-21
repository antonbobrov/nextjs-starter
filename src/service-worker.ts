const registerServiceWorker = () => {
    if (
        process.env.NODE_ENV === 'development'
        || typeof window === 'undefined'
        || process.env.NEXT_PUBLIC_REGISTER_SERVICE_WORKER !== 'true'
    ) {
        return;
    }

    // This is the "Offline page" service worker
    // Check compatibility for the browser we're running this in
    if ('serviceWorker' in navigator) {
        if (navigator.serviceWorker.controller) {
            // has active service worker
        } else {
            // Register the service worker
            navigator.serviceWorker
                .register('/sw.js', {
                    scope: './',
                })
                .then(() => {
                    // registered service worker
                }).catch(() => {});
        }
    }
};

export default registerServiceWorker;
