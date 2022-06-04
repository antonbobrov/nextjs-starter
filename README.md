# Next.JS Vevet Starter

## Main Stack
* Next.js - https://github.com/vercel/next.js/
* Vevet - https://github.com/antonbobrov/vevet
* Redux - https://github.com/reduxjs/redux
* Sentry - https://sentry.io/

## Getting started
Create **.env.local** file with the following contents:
```
NEXT_PUBLIC_URL_BASE=
NEXT_PUBLIC_URL_API=https://cms.example.com/api/
NEXT_PUBLIC_URL_API_PAGE=https://cms.example.com/api/page/
API_KEY=_____test_key_____

NOINDEX=true
NEXT_PUBLIC_REGISTER_SERVICE_WORKER=true

SSP_CACHE=false
SSP_CACHE_LIMIT=100
SSP_CACHE_AGE=2592000

SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH=

NEXT_PUBLIC_USE_GUI=false
```
Required production vars:
```
NEXT_PUBLIC_URL_API
NEXT_PUBLIC_URL_API_PAGE
```

And run the commands:
```bash
npm i
npm run dev
```


## Tasks
* dev - local development
* build - create a production build
* start - launch the production build

## Preferred PaaS
* DigitalOcean AppPlatform - https://www.digitalocean.com/
* Vercel - https://vercel.com/
* Amplify - https://aws.amazon.com/

