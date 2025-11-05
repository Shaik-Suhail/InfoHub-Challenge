import { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";
import { CloudSun, DollarSign, Quote } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("Weather");

  const tabs = [
    { name: "Weather", icon: <CloudSun size={18} /> },
    { name: "Currency", icon: <DollarSign size={18} /> },
    { name: "Quotes", icon: <Quote size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Weather":
        return <WeatherModule />;
      case "Currency":
        return <CurrencyConverter />;
      case "Quotes":
        return <QuoteGenerator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md py-5 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
          🌤️ InfoHub Dashboard
        </h1>
        <p className="text-gray-500 mt-1">All your everyday info in one place</p>

        <div className="flex gap-3 mt-5">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.name
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>
      </header>

      <main className="flex justify-center items-start mt-10">
        <div className="w-full max-w-xl">{renderContent()}</div>
      </main>

      <footer className="text-center text-gray-400 text-sm py-5">
        © {new Date().getFullYear()} InfoHub Challenge by Suhail 🚀
      </footer>
    </div>
  );
}
