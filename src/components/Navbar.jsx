"use client"

import Link from "next/link"
import { FaUsers, FaHome, FaDatabase } from "react-icons/fa"

export default function Navbar() {
  return (
    <div className="navbar bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <FaHome className="text-purple-400 text-2xl" />
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Users Dashboard
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center">
          <ul className="menu menu-horizontal px-1 flex gap-6 text-gray-300 font-medium">
            <li>
              <Link
                href="/users"
                className="flex items-center gap-1 hover:text-purple-400 transition-colors"
              >
                <FaUsers className="text-lg" />
                Users
              </Link>
            </li>
            <li>
              <a
                href="https://jsonplaceholder.typicode.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-purple-400 transition-colors"
              >
                <FaDatabase className="text-lg" />
                API
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
