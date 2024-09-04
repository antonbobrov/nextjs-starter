import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://bc00830333f06dc2263f16cbed6bf15e@o1049822.ingest.us.sentry.io/4507896204689409',
  tracesSampleRate: 1,
  debug: false,
});
