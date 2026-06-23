# React Weather App

Weather app built with React, TypeScript and Vite. Uses the OpenWeatherMap API for current conditions and 5-day forecasts.

Live: https://ozzymdev.vercel.app

---

## Features

- Auto-detects location on load via geolocation (falls back to Valletta if denied)
- Search any city
- Current weather — temprature, feels like, humidity, wind speed
- 5-day forecast grouped by local timezone
- Skeleton loading states
- Night mode toggle

### In Progress

- Skeleton loading states

---

## Stack

- React + Vite + TypeScript
- React Router
- OpenWeatherMap API (current weather, forecast, reverse geocoding)

---

## Project structure

```
src/
├── Components/
│   ├── Navbar/
│   ├── Weather/
│   └── Forecast/
├── types/
│   └── WeatherTypes.ts
└── App.tsx
```

---

## Planned

- Autocomplete search
- Dynamic backgrounds per weather condition
- Search history
- Temperature trend chart

---

## What I learned

- Typing third-party API responses — not all fields are guaranteed, optional fields matter
- Status enums (`idle / loading / success / error`) over boolean flags — cleaner state that can't get out of sync
- Timezone-aware date grouping from raw UTC timestamps
- Lifting state up vs Context — at 2 levels deep props are fine
- TypeScript migrations are easier leaf-first — start from components with no children, work up to the root

---

## Setup

```bash
npm install
```

Create a `.env` file in the root:

```
VITE_APP_ID=your_openweathermap_api_key
```

Get your key at openweathermap.org — free tier is enough.

```bash
npm run dev
```

---
