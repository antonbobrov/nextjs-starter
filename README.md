# Next.js Starter

## Config
node v20.2.0 \
npm v9.6.6

## P.S. Use next@13.4.7 (13.4.8+ reloads the whole page instead of hot replacement when editing child components of _app.tsx)

## Getting started
Create **.env.local** file with the following contents:
```
NEXT_PUBLIC_URL=...
NEXT_PUBLIC_API=https://cms.example.com/api/
NEXT_PUBLIC_API_PAGE=https://cms.example.com/api/page/
NEXT_PUBLIC_STORAGE=https://cms.example.com/storage/:file*
API_KEY=_____test_key_____

SEARCHABLE=false
```
Required production vars:
```
NEXT_PUBLIC_API=...
NEXT_PUBLIC_API_PAGE=...
SEARCHABLE=true
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
