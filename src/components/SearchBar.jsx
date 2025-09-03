'use client'

import { FaSearch } from "react-icons/fa"

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none transition"
      />
    </div>
  )
}
