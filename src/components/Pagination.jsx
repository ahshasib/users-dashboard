export default function Pagination({ page, totalPages, onPageChange }) {
    // page থেকে previous এবং next button disable হবে
    const canPrev = page > 1
    const canNext = page < totalPages
  
    // Pagination buttons generate
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  
    return (
      <div className="flex items-center justify-center gap-2 mt-4">
        {/* Previous Button */}
        <button
          className={`btn btn-sm ${!canPrev ? 'btn-disabled' : ''}`}
          onClick={() => canPrev && onPageChange(page - 1)}
        >
          Prev
        </button>
  
        {/* Page Numbers */}
        {pages.map((p) => (
          <button
            key={p}
            className={`btn btn-sm ${p === page ? 'btn-active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
  
        {/* Next Button */}
        <button
          className={`btn btn-sm ${!canNext ? 'btn-disabled' : ''}`}
          onClick={() => canNext && onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    )
  }

  