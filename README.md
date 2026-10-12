# Airbnb Clone

A responsive Airbnb-style stays search built with **Next.js 15**, **React 19** and **Tailwind CSS**.

**Live:** https://airbnbcode.vercel.app

> Portfolio project by Sayan Mandal. Not affiliated with Airbnb, Inc.

## Features

- Home page with hero banner, "Explore nearby" destinations, "Live anywhere" categories and an inspiration card
- Search bar with destination suggestions, check-in / check-out dates and a guest counter
- Server-rendered search results (`getServerSideProps`) with nights and total price worked out from your dates
- Filter chips (type of place, price, Superhost) and sorting by price or rating
- Interactive OpenStreetMap map (Leaflet, no API key) with price markers that highlight as you hover listings
- Route-change progress bar, mobile-friendly layout, optimized images via `next/image`

## What changed in v2 (2026)

The 2023 version broke in several ways:

- The search page 404'd (`FUNCTION_RUNTIME_DEPRECATED`) because it ran on a Node version Vercel has retired
- `"next": "latest"` pulled a Next.js release incompatible with React 17, so new deploys failed
- Listing data and images came from a tutorial host whose links are dying
- The map relied on a personal Mapbox token and `react-map-gl` v6; the date picker didn't support modern React

v2 pins Next.js 15 / React 19 / Tailwind 3 on Node 22, moves all data into `data/destinations.js` with Unsplash photos, swaps Mapbox for Leaflet + OpenStreetMap, replaces the date picker with native date inputs, and fixes the search page crashing when dates were missing.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Structure

```
pages/        index (home), search (SSR results), _app, _document
components/   Header, SearchPanel, Banner, cards, ListingCard, Map, Footer
data/         destinations, categories and listing generator
```

Photos from [Unsplash](https://unsplash.com). Map data © OpenStreetMap contributors.
