# Next.JS Vevet Starter

## Main Stack
* Next.js - https://github.com/vercel/next.js/
* Vevet - https://github.com/antonbobrov/vevet
* Redux - https://github.com/reduxjs/redux
* Sentry - https://sentry.io/

## Getting started
Create **.env.local** file with the following contents:
```
NEXT_PUBLIC_URL_BASE=http://localhost:3000/

NEXT_PUBLIC_URL_CMS=https://cms.example.com/
NEXT_PUBLIC_URL_API=https://cms.example.com/api/
NEXT_PUBLIC_URL_API_PAGE=https://cms.example.com/api/page/
API_KEY=_____test_key_____
API_IS_REAL=true

NOINDEX=true
SSP_CACHE=false
USE_WEBP_REPLACE=true

SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH=
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
* API_IS_REAL - set true if you use an existing API. By default, the front-end part must contain placeholders for local development without back-end API. It is also used to define if there's a need to fetch the sitemap & process back-end redirects.
* SENTRY_*** - all the variables with this prefix must be filled if you want to use the Sentry bug tracker (works only in production).


## Tasks
* dev - local development
* build - create a production build
* start - launch the production build

## Preferred PaaS
* DigitalOcean AppPlatform - https://www.digitalocean.com/
* Vercel - https://vercel.com/
* Amplify - https://aws.amazon.com/

