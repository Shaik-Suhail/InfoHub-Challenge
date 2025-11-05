import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// ---------------- WEATHER API ----------------
app.get("/api/weather", async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_KEY;
    let city = req.query.city || process.env.WEATHER_CITY || "Hyderabad,IN";

    city = city.trim();

    if (!apiKey) {
      throw new Error("❌ Missing OpenWeather API Key in .env file");
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    console.log("🌍 Fetching weather for:", city);

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
    });
  } catch (error) {
    console.error("❌ Error fetching weather data:", error.response?.data || error.message);

    res.status(500).json({
      error: "Could not fetch weather data",
      details: error.response?.data || error.message,
    });
  }
});

// ---------------- CURRENCY API ----------------
// ---------------- CURRENCY API ----------------
app.get("/api/currency", async (req, res) => {
  try {
    console.log("💱 Fetching currency data...");

    const url = "https://open.er-api.com/v6/latest/INR";
    const response = await axios.get(url, { timeout: 7000 });

    // Check if API returns success
    if (response.data.result !== "success") {
      throw new Error("Currency API returned an invalid response.");
    }

    const rates = response.data.rates;

    res.json({
      base: "INR",
      usd: rates.USD,
      eur: rates.EUR,
      gbp: rates.GBP,
      jpy: rates.JPY, // 🇯🇵 Japanese Yen
      aud: rates.AUD, // 🇦🇺 Australian Dollar
    });
  } catch (error) {
    console.error("❌ Error fetching currency data:", error.message);

    // Local fallback conversion rates
    const fallbackRates = {
      USD: 0.012,
      EUR: 0.011,
      GBP: 0.0095,
      JPY: 1.75,
      AUD: 0.018,
    };

    res.status(200).json({
      base: "INR",
      usd: fallbackRates.USD,
      eur: fallbackRates.EUR,
      gbp: fallbackRates.GBP,
      jpy: fallbackRates.JPY,
      aud: fallbackRates.AUD,
      source: "Fallback data",
    });
  }
});

// ---------------- QUOTE API ----------------
app.get("/api/quote", async (req, res) => {
  try {
    console.log("💬 Fetching quote from Quotable...");
    const response = await axios.get("https://api.quotable.io/random", {
      timeout: 5000,
    });

    res.json({
      quote: response.data.content,
      author: response.data.author,
      source: "Quotable API",
    });
  } catch (error) {
    console.error("⚠️ Quotable API failed, using fallback quotes.");

    // Fallback local quotes (for offline or API timeout)
    const fallbackQuotes = [
      {
        quote: "The best way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
      },
      {
        quote: "Success is not the key to happiness. Happiness is the key to success.",
        author: "Albert Schweitzer",
      },
      {
        quote: "Don’t let yesterday take up too much of today.",
        author: "Will Rogers",
      },
      {
        quote: "It always seems impossible until it’s done.",
        author: "Nelson Mandela",
      },
      {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
      },
    ];

    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

    res.status(200).json({
      quote: random.quote,
      author: random.author,
      source: "Local Fallback",
    });
  }
});

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve the React build
app.use(express.static(path.join(__dirname, "client-dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client-dist", "index.html"));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
