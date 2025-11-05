import { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
   const res = await axios.get("/api/quote");
    setQuote(res.data.quote);
    setAuthor(res.data.author);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 text-center transition-all hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex justify-center items-center gap-2">
        <Sparkles size={22} /> Motivational Quote
      </h2>

      <blockquote className="text-lg italic text-gray-700 mb-3">“{quote}”</blockquote>
      <p className="text-gray-500 mb-5">— {author}</p>

      <button
        onClick={fetchQuote}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition"
      >
        New Quote ✨
      </button>
    </div>
  );
}
