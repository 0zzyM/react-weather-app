# 🌤 React Weather App

A modern weather application built with **React + Vite** that allows users to search for any city and view real-time weather data along with a structured 5-day forecast.

---

## 🚀 Project Overview

This app fetches live weather data using the **OpenWeatherMap API** and presents it in a clean, responsive UI with improved data processing and optimized forecast logic.

Users can:

- 🌍 Automatically detect location via geolocation
- 🔎 Search for any city worldwide
- 🌡 View current weather conditions
- 📅 View a structured 5-day forecast (grouped from 3-hour interval data)
- 🌙 Toggle dark mode

If geolocation is denied, the app falls back to **Valletta** as the default city.

---

## 🧰 Tech Stack

### Frontend

- React (Functional Components & Hooks)
- Vite (Development & Build Tool)
- CSS (Custom styling & responsive design)
- Lucide React (Icons)

### API

- OpenWeatherMap API
  - Current Weather Endpoint
  - 5-Day / 3-Hour Forecast Endpoint
  - Reverse Geocoding API

---

## ✨ Features

### 🌡 Current Weather

- Temperature (°C)
- Weather description & icon
- Humidity
- Wind speed

---

### 📅 Forecast Improvements

- Multi-day forecast cards
- Data grouped by **local timezone**
- Forecast limited to the first **5 valid days**
- Calculates:
  - Average daily temperature
  - Most frequent weather icon per day
- Responsive wrapping layout
- Auto-centered card alignment

---

### ⚡ Performance Optimizations

- Parallel API calls using `Promise.all()`
  - Fetches current weather and forecast simultaneously
- Reduced loading time
- Optimized data transformation logic
- Refactored icon calculation algorithm

---

### 🌍 Smart Location Handling

- Automatically detects user location on app load
- Uses reverse geocoding to determine city name
- Falls back to **Valletta** if location access fails

---

### 🎨 UI / UX Improvements

- Glassmorphism-inspired design
- Smooth dark mode implementation
- Soft shadows & depth
- Improved spacing & layout structure
- Responsive design (mobile → desktop)
- Refined forecast card structure

---

## 📱 Responsive Design

The layout adapts smoothly to:

- Desktop screens
- Tablets
- Mobile devices

Forecast cards wrap naturally and remain centered across screen sizes.

---

## 📂 Architecture

### Frontend Responsibilities

- UI rendering
- Search input & interactions
- API data fetching
- State management with hooks
- Conditional rendering (loading & error states)

### Data Processing

- Group forecast data by local date
- Limit results to 5 days
- Compute:
  - Daily averages
  - Most frequent weather icon

---

## 🔐 Security

- API key stored in `.env`
- `.env` excluded via `.gitignore`
- No sensitive data exposed in the repository

---

## 🧪 Development Status

| Area                 | Status         |
| -------------------- | -------------- |
| UI / Layout          | ✅ Stable      |
| Current Weather API  | ✅ Working     |
| Forecast Integration | ✅ Optimized   |
| Timezone Handling    | ✅ Fixed       |
| Error Handling       | 🟡 Basic       |
| Dark Mode            | ✅ Implemented |

---

## 🛣 Planned Improvements

- 🔍 Autocomplete / typeahead search
- 📊 Better error UI feedback
- 🎨 Dynamic backgrounds based on weather conditions
- 💾 Search history persistence
- ⚡ Further performance improvements
- 📈 Temperature trend charts

---

## 💡 What I Learned

- Advanced React state management
- Async API handling with parallel requests
- Timezone-based date transformation
- Data grouping and aggregation
- Performance optimization techniques
- Clean code refactoring
- Debugging real-world API inconsistencies
