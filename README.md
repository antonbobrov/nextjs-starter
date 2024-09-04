# Next.js Starter

// todo: update readme
// todo: webpagetest

## Config
node version > 20.x

// todo: about differencies and advantages

## Environment variables
- `PUBLIC_URL` - website base URL;
- `API_URL` - back-end API routes base URL; preferred format - `https://data.website.com/api`;
- `API_PAGE_URL` - back-end pages base URL; preferred format - `https://data.website.com/`;
- `SECRET_TOKEN` - secret token for private actions;
- `SEARCHABLE` - the website can be crawled by search engines; `false` by default.
- `SWR_TIME` - SWR time.
- `SENTRY_AUTH_TOKEN`

### Required production vars:
- `PUBLIC_URL=___`
- `API_PAGE_URL=___`
- `SEARCHABLE=true`

## Tasks
* `dev` - local development
* `build` - create a production build
* `start` - start the website in production

## Structure Overview

// todo: review

- `/config` - next.js additional config
- `/mock` - front-end mock data
- `/public` - static resources
- `/src`
  - `/components` - React/Next components (that may be reused in different pages)
  - `/layout` - global components that define the main layout of the page
  - `/lexicon` - text localization
  - `/pages` - next.js routes
  - `/store` - redux store
  - `/styles` - global styles
  - `/templates` - custom page templates
  - `/types` - global types
  - `/utils` - global utilities

## `src/pages` directory
In comparison to the classic Next.js application structure, this template has only 2 page endpoints: `index` & `slug`. These routes use ISR.

Both run the same function `getPageProps` which fetches data from back-end, and the fetching URL depends on the current URL of the page. For a user who runs `http://website.com/en/about`, the API URL will be `http://data.website.com/en/about`. User headers and GET parameters are not transferred through API.

While development without back-end, mocks in `./mock` should be created.

## Back-end preferences
When updating a certain page, the back-end should send a request to clear the SWR cache via `/api/revalidate?token=12345678&path=/en` endpoint.
This logic works well on Vercel but has pitfalls on DigitalOcean App Platform: specifically, AppPlatform runs through Cloudflare which creates a new layer of caching, which means that after revalidating the page may return old content because of Cloudflare cache. In this case, a newer version of the page may be seen when accessing it with a unique GET parameter or making SWR cache time shorter in the `.env` file or in `global.meta.swr` property.