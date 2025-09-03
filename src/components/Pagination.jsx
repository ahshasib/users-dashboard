import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export default function Pagination({ page, totalPages, onPageChange }) {
  const canPrev = page > 1
  const canNext = page < totalPages

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous Button */}
      <button
        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all ${
          canPrev
            ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:opacity-90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
      >
        <FaArrowLeft className="text-xs" />
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 text-sm font-semibold transition-all ${
            p === page
              ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-400 hover:to-indigo-500 hover:text-white"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all ${
          canNext
            ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:opacity-90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
      >
        Next
        <FaArrowRight className="text-xs" />
      </button>
    </div>
  )
}
