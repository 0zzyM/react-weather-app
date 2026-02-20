# React Weather App

🚀 **Project Overview**  
This project is a simple weather application built in **React** using **Vite**. Users can search for any city worldwide and see the current weather, including temperature, weather description, humidity, pressure, and wind. The app fetches live data from the **OpenWeatherMap API**.

---

🧰 **Tech Stack**  

**Frontend**  
- React (Functional Components, Hooks)  
- Vite (Development & Build Tool)  
- CSS (Styling)  
- Lucide React (Icons for humidity, wind, pressure, etc.)  

**API**  
- OpenWeatherMap API (Current Weather Data)  

---

✨ **Features**  
✅ Search for any city  
✅ Display current temperature in Celsius  
✅ Show weather description & icon  
✅ Display additional info:
  - Feels Like temperature  
  - Min & Max temperature  
  - Humidity  
  - Atmospheric pressure  
✅ Responsive layout  

---

📂 **Architecture**

**Frontend Handles**  
- UI rendering  
- Search input & button  
- Displaying API response data  
- Conditional rendering for errors / loading  

**API Handles**  
- Current weather data retrieval via OpenWeatherMap API  
- Returning JSON response  

---

🔐 **Security**  
- API key stored in `.env` file (never pushed to GitHub)  
- No sensitive data exposed  

---

🧪 **Development Status**

| Area                | Status         |
|--------------------|---------------|
| UI / Components     | ✅ Stable     |
| API Fetching        | ✅ Working    |
| Error Handling      | 🟡 Basic      |
| Additional Features | 🟡 Planned    |

---

🛣 **Planned Improvements**  
- Add detailed 5-day weather forecast  
- Autocomplete / typeahead search
- Dynamic backgrounds & animations based on weather  
- Loading spinners & better error messages  
- Store search history  

---

💡 **What I Learned Building This**  
- Using **React Hooks** (`useState`, `useEffect`) effectively  
- Fetching and displaying data from a third-party API  
- Conditional rendering & safe state handling in React  
- Adding and using external icon libraries (Lucide React)  

---

📷 **Screenshots**  
