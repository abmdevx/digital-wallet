import React from "react";
import { Search } from "lucide-react";

function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="relative flex items-center max-w-sm mb-5">
      {/* Search icon */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
      
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search wallets..."
        className="w-full pl-10 pr-20 py-3 border border-white/20 rounded-2xl 
        text-white placeholder-white/50 focus:outline-none transition-all duration-300"
      />

      {/* Button */}
      <button
        onClick={onSearch}
        className="absolute right-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 rounded-xl text-white cursor-pointer transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;