
# Next.js Starter

// todo: add languages

A Next.js starter project with customizable configurations, routing, and SWR-based static regeneration. This template supports flexible content rendering.

## Features
- **Dynamic Routing**: Minimal routing with `index` and `slug` pages that render dynamic templates based on backend data.
- **Caching Flexibility**: uses ISR & SWR for static regeneration and revalidation control.

## Configuration
- **Node Version**: Requires Node.js > 20.x
- **Available Environment Variables**:
  - `PUBLIC_URL` - Base URL of the website (e.g., `https://website.com/`)
  - `API_PAGE_URL` - Base URL for page API routes, preferred format: `https://data.website.com/`
  - `API_URL` - Base URL for backend API routes, preferred format: `https://data.website.com/api`
  - `SECRET_TOKEN` - Secret token for private actions (default: `12345678`)
  - `SEARCHABLE` - Determines if the website can be crawled by search engines (`false` by default)
  - `SWR_TIME` - Cache time for SWR regeneration (default: `604800` seconds)
  - `NEXT_PUBLIC_ASSETS_PREFIX` - assetsPrefix for CDNs (e.g. `https://website.b-cdn.net`)
  - Sentry Variables (for error monitoring):
    - `SENTRY_AUTH_TOKEN`
    - `SENTRY_ORG`
    - `SENTRY_PROJECT`
- **Required for Production**:
  - `PUBLIC_URL`
  - `API_PAGE_URL`
  - `SEARCHABLE`

## Setup Tasks
- `dev` - Starts a local development server
- `build` - Creates a production build
- `start` - Runs the production build locally

## Project Structure

- `/config` - Additional Next.js configuration files
- `/public` - Static resources (images, icons, etc.)
- `/src`
  - `/components`
    - `/ui` - Reusable UI components
    - `/layout` - Layout components defining the main structure
  - `/lexicon` - Text localization resources
  - `/mock` - Dynamic mock data to simulate backend responses
  - `/pages` - Next.js routes
    - `/api` - API routes for server-side functionality
      - `/mock` - Mock API routes, replaced when `API_PAGE_URL` is set
  - `/setup` - Globally executed setup scripts
  - `/store`
    - `/page` - React context for global and template-specific data
    - `/redux` - Redux store for managing layout state
  - `/styles` - Global stylesheets
  - `/templates` - Custom page templates
  - `/types` - Global TypeScript types
  - `/utils` - Global utility functions

## Routing Overview

This starter uses a minimalistic approach to Next.js routing, typically with only two main routes:
- `index` - Root route for the main page
- `slug` - Dynamic route for all other pages

These routes fetch global and page-specific data from the backend or mocks, then pass the data to the `_app.tsx` file, which triggers the `@/templates/_Renderer/Renderer` component. This setup enables flexible page rendering, ideal for CMS integrations with multiple templates.

### Example Data Fetching Flow
When a page loads (`https://website.com/en/about`), two backend endpoints are requested:
1. **Global Data** (e.g., `https://data.website.com/__global?locale=en&path=/about`)
2. **Page Data** (e.g., `https://data.website.com/about?locale=en`)

The `templateName` in the page data determines which template to render. If `templateName` is not set, the default page content from Next will be rendered.

## Backend Integration Notes
To revalidate cached pages, the backend should trigger a cache-clear request to `https://website.com/api/revalidate?token=12345678&path=/en`.

### Platform-Specific Caching
- **Vercel**: Compatible with automatic cache revalidation.
- **DigitalOcean App Platform**: Since it uses Cloudflare for additional caching, there may be a delay in cache updates. To mitigate this:
  - Add a unique query parameter (e.g., `?refresh=1`) for updated page views.
  - Adjust the cache time (`SWR_TIME`) in the `.env` file or `meta.swr` property.
