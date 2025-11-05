import { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign, Euro, Coins, Banknote } from "lucide-react"; // ✅ all exist in lucide-react

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/currency"); // ✅ relative path (works locally & after deployment)
      setRates(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch currency data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto text-center transition-transform hover:scale-[1.02] duration-300">
      <h2 className="text-3xl font-semibold text-green-600 mb-2 flex justify-center items-center gap-2">
        <Coins className="text-green-500" size={24} /> Currency Converter
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Get live exchange rates for INR (Indian Rupee)
      </p>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Fetching live rates...</p>
      ) : error ? (
        <p className="text-red-500 font-medium">{error}</p>
      ) : (
        <>
          {/* Input Box */}
          <div className="flex justify-center gap-2 mb-6">
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-32 text-center text-lg font-medium focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <span className="text-lg font-semibold mt-2 text-gray-700">INR</span>
          </div>

          {/* Currency Results */}
          <div className="space-y-3 text-left mt-6">
            {/* USD */}
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <DollarSign size={18} /> USD
              </div>
              <span className="font-semibold">
                {(amount * rates.usd).toFixed(2)}
              </span>
            </div>

            {/* EUR */}
            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600">
                <Euro size={18} /> EUR
              </div>
              <span className="font-semibold">
                {(amount * rates.eur).toFixed(2)}
              </span>
            </div>

            {/* JPY */}
            <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-600">
                <Banknote size={18} /> JPY
              </div>
              <span className="font-semibold">
                {(amount * rates.jpy).toFixed(2)}
              </span>
            </div>

            {/* AUD */}
            <div className="flex justify-between items-center bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600">
                <Coins size={18} /> AUD
              </div>
              <span className="font-semibold">
                {(amount * rates.aud).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Source Info */}
          {rates.source && (
            <p className="text-sm text-gray-400 mt-4 italic">
              {rates.source === "Fallback data"
                ? "⚠️ Using backup exchange rates"
                : "✅ Live data from Currency API"}
            </p>
          )}
        </>
      )}
    </div>
  );
}
