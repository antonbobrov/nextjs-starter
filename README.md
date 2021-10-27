# Next.JS Vevet Starter

## Main Stack
* Next.js - https://github.com/vercel/next.js/
* Vevet - https://github.com/antonbobrov/vevet
* Redux - https://github.com/reduxjs/redux
* Lit - https://github.com/lit/lit
* Sentry - https://sentry.io/

## Getting started
Create **.env.local** file with the following contents:
```
NEXT_PUBLIC_URL_BASE=http://localhost:3000/
NEXT_PUBLIC_NOINDEX=true

NEXT_PUBLIC_URL_API=http://localhost:3000/api/
NEXT_PUBLIC_URL_API_PAGE=http://localhost:3000/api/page/
API_KEY=
IS_REAL_API=false

NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_ORG=
NEXT_PUBLIC_SENTRY_PROJECT=
NEXT_PUBLIC_SENTRY_AUTH=
```
And run the commands:
```bash
npm i
npm run dev
```

## Environment variables
* NEXT_PUBLIC_URL_BASE - front-end base url (f.e., https://example.com/)
* NEXT_PUBLIC_NOINDEX - set true if you don't want the website to be indexed
* NEXT_PUBLIC_URL_API - API url (f.e., https://example.com/api/)
* NEXT_PUBLIC_URL_API_PAGE - API url to gain page props (f.e., https://example.com/api/page/ or https://example.com/)
* API_KEY - API key
* IS_REAL_API - set true if you use an existing API. By default, the front-end part must contain placeholders for local development without back-end API. It is also used to define if there's a need to fetch the sitemap & process back-end redirects.
* NEXT_PUBLIC_SENTRY_*** - all the variables with this prefix must be filled if you want to use the Sentry bug tracker (works only in production).


## Tasks
* dev - local development
* build - create a production build
* start - launch the production build

## Preferred PaaS
* DigitalOcean AppPlatform - https://www.digitalocean.com/
* Vercel - https://vercel.com/
* Amplify - https://aws.amazon.com/

