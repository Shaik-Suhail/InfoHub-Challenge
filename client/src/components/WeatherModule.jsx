import { useState, useEffect } from "react";
import axios from "axios";
import { Droplets, Wind, CloudSun } from "lucide-react";

export default function WeatherModule() {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (queryCity = city) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/weather?city=${queryCity}`);
      setWeather(res.data);
      setError("");
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 text-center transition-all hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-center gap-2">
        <CloudSun size={24} /> Weather Information
      </h2>

      <div className="flex justify-center gap-2 mb-5">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-2/3 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Enter city name"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Fetching weather data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : weather ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{weather.city}</h3>
          <p className="text-4xl font-bold text-blue-600">{weather.temperature}°C</p>
          <p className="text-gray-500 capitalize">{weather.condition}</p>

          <div className="flex justify-center gap-6 mt-3 text-gray-700">
            <span className="flex items-center gap-1">
              <Droplets size={16} /> {weather.humidity}%
            </span>
            <span className="flex items-center gap-1">
              <Wind size={16} /> {weather.wind_speed} m/s
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No data yet</p>
      )}
    </div>
  );
}
