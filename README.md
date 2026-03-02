# 🌤 React Weather App

A modern weather application built with **React + Vite** that allows users to search for any city and view real-time weather data along with a multi-day forecast.

---

## 🚀 Project Overview

This app fetches live weather data using the **OpenWeatherMap API** and presents it in a clean, responsive UI with a glassmorphism-inspired design and refined layout structure.

Users can:

- Search for any city worldwide
- View current weather conditions
- View a 5-day forecast (3-hour interval data grouped per day)
- See additional weather details like humidity, pressure, and wind

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

---

## ✨ Features

### 🌡 Current Weather

- Temperature (°C)
- Weather description & icon
- Feels Like temperature
- Min / Max temperature
- Humidity
- Atmospheric pressure
- Wind speed

### 📅 Forecast

- Multi-day forecast cards
- Responsive wrapping layout
- Auto-centered card alignment

### 🎨 UI / UX Improvements

- Glassmorphism styling
- Soft shadows & depth
- Improved spacing and layout organization
- Responsive design (mobile → desktop)
- Refined card structure and alignment

---

## 📱 Responsive Design

The layout adapts smoothly to:

- Desktop screens
- Tablets
- Mobile devices

Forecast cards wrap naturally and remain centered across screen sizes.

---

## 📂 Architecture

### Frontend Handles

- UI rendering
- Search input & interactions
- Fetching API data
- State management with hooks
- Conditional rendering (loading & error states)

### API Handles

- Current weather data retrieval
- Forecast data retrieval
- JSON response formatting

---

## 🔐 Security

- API key stored in `.env`
- `.env` excluded via `.gitignore`
- No sensitive data exposed in the repository

---

## 🧪 Development Status

| Area                 | Status       |
| -------------------- | ------------ |
| UI / Layout          | ✅ Stable    |
| Current Weather API  | ✅ Working   |
| Forecast Integration | 🟡 Improving |
| Error Handling       | 🟡 Basic     |
| Dark Mode            | 🔵 Planned   |

---

## 🛣 Planned Improvements

- 🌙 Dark Mode
- Improved 5-day forecast grouping logic
- Autocomplete / typeahead search
- Dynamic backgrounds based on weather conditions
- Loading spinners
- Enhanced error states
- Search history persistence

---

## 💡 What I Learned

- Structuring a React application properly
- Managing API calls with `useState` and `useEffect`
- Handling asynchronous data safely
- Responsive layout strategies (Grid vs Flexbox)
- UI refinement and spacing systems
- Debugging layout behavior across breakpoints

---
