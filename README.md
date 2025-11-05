# 🌐 InfoHub — Full Stack Web Application

A **React + Node.js full-stack project** built as part of the **ByteXL “InfoHub” Coding Challenge**, integrating three everyday utilities:
- 🌦️ **Weather Information**
- 💱 **Currency Converter**
- 💬 **Motivational Quote Generator**

Hosted live on **Render**  
🔗 **Live URL:** [https://infohub-challenge-48il.onrender.com](https://infohub-challenge-48il.onrender.com)

---

## 🧭 Project Overview

**Goal:**  
To design and deploy a single-page web app (SPA) that brings together weather, currency, and quotes functionality — demonstrating integration of APIs, frontend/backend communication, and modern responsive UI.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Lucide React (icons)

### ⚙️ Backend
- Node.js
- Express.js
- Axios
- dotenv
- CORS

### 🌩️ Deployment
- **Render** (Full-stack deployment: frontend + backend)
- GitHub (source hosting)

---

## 📁 Folder Structure

InfoHub-Challenge/
├── client/ # React frontend (Vite + Tailwind)
│ ├── src/
│ │ ├── components/
│ │ │ ├── WeatherModule.jsx
│ │ │ ├── CurrencyConverter.jsx
│ │ │ └── QuoteGenerator.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── package.json
│ └── vite.config.js
│
├── server/ # Express backend
│ ├── server.js
│ ├── .env
│ └── client-dist/ # Built React frontend (copied after npm run build)
│
├── README.md
└── package.json
## 🪜 Step-by-Step Setup Guide

### 🧩 1. Clone the Repository
```bash
git clone https://github.com/Shaik-Suhail/InfoHub-Challenge.git
cd InfoHub-Challenge
⚙️ 2. Backend Setup
bash
Copy code
cd server
npm init -y
npm install express axios cors dotenv
Create a .env file inside /server:

ini
Copy code
PORT=3001
OPENWEATHER_KEY=your_api_key_here
WEATHER_CITY=Hyderabad,IN
💻 3. Frontend Setup
bash
Copy code
cd ..
npm create vite@latest client -- --template react
cd client
npm install
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Add Tailwind setup in tailwind.config.js:

js
Copy code
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
theme: { extend: {} },
plugins: [],
Add Tailwind imports in index.css:

css
Copy code
@tailwind base;
@tailwind components;
@tailwind utilities;
🧠 4. Backend Routes Overview
🧩 /api/weather
Fetches real-time weather data using the OpenWeather API.

💱 /api/currency
Fetches exchange rates from ExchangeRate API, returning INR → USD, EUR, GBP, JPY, AUD.

💬 /api/quote
Fetches random motivational quotes from Quotable API.
If the API fails, it returns quotes from a local fallback list.

🖌️ 5. Frontend Components
Component	Description
WeatherModule.jsx	Displays live weather data and allows searching different cities.
CurrencyConverter.jsx	Converts INR into multiple currencies (USD, EUR, GBP, JPY, AUD).
QuoteGenerator.jsx	Displays motivational quotes (from API or fallback).

All components include loading + error states, ensuring smooth UX.

🎨 6. UI/UX and Responsiveness
Built with Tailwind CSS

Optimized for both desktop and mobile

Modern cards, shadows, icons, and smooth transitions

Lucide-react icons enhance visualization

🧱 7. Building the Frontend
In /client directory:

bash
Copy code
npm run build
This generates a production-ready folder:

bash
Copy code
client/dist
Then move it into the server directory:

bash
Copy code
Move-Item -Path "C:\Users\HP\InfoHub-Challenge\client\dist" -Destination "C:\Users\HP\InfoHub-Challenge\server\client-dist"
🧩 8. Integrate Frontend into Server
In server/server.js:

js
Copy code
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static build files
app.use(express.static(path.join(__dirname, "client-dist")));

// Serve index.html for all non-API routes
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "client-dist", "index.html"));
  } else {
    next();
  }
});
🚀 9. Local Testing
Run both servers:

Backend
bash
Copy code
cd server
node server.js
→ Runs at http://localhost:3001

Frontend
bash
Copy code
cd client
npm run dev
→ Runs at http://localhost:5173

☁️ 10. Deployment (Render)
Push to GitHub

bash
Copy code
git add .
git commit -m "Initial project and build"
git push origin main
On Render:

Create a New Web Service

Connect your GitHub repo

Build Command: npm install

Start Command: node server.js

Root Directory: /server

Add environment variables:

OPENWEATHER_KEY

PORT → 10000

Render automatically deploys both backend and frontend together.

✅ Deployment Log should show:

arduino
Copy code
✅ Server running on http://localhost:10000
==> Your service is live 🎉
