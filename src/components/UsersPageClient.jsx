'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import UserTable from './UserTable'

export default function UsersPageClient({ users }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const p = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '5', 10)
    setQuery(q)
    setPage(Number.isNaN(p) ? 1 : p)
    setPerPage([5, 10, 20].includes(limit) ? limit : 5)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (page > 1) params.set('page', String(page))
    if (perPage !== 5) params.set('limit', String(perPage))
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }, [query, page, perPage, pathname, router])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  }, [users, query])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * perPage
  const paginated = filtered.slice(start, start + perPage)

  const handleRowClick = (id) => router.push(`/users/${id}`)

  // Radio wave animation props
  const waves = [0, 1, 2] // multiple waves

  return (
    <div className="relative min-h-screen w-full p-10 overflow-hidden bg-gray-900 text-white">

      {/* Radio wave animation */}
      {/* Subtle radio wave animation */}
      {waves.map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 rounded-full border"
          style={{
            width: 200 + i * 150,
            height: 200 + i * 150,
            marginLeft: -(100 + i * 75),
            borderColor: 'rgba(59, 130, 246, 0.1)', // subtle light blue
            borderWidth: '30px', // thin border
          }}
          animate={{
            scale: [0, 3],
            opacity: [0.1, 0], // very subtle
          }}
          transition={{
            duration: 4 + i, // slower for smooth effect
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.5,
          }}
        />
      ))}


      {/* Page content */}
      <motion.div
        className="relative z-10 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-50">
              Users
            </h1>

            <div className="flex items-center gap-4 bg-gray-800 p-4 w-40 justify-between shadow-md">
              <div className="text-gray-300 uppercase text-sm font-medium">
                Total Users
              </div>
              <div className="text-white text-xl md:text-2xl font-semibold">
                {total}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <SearchBar value={query} onChange={setQuery} placeholder="Search by name or email" />
            <label className="form-control max-w-xs">
              <div className="label"><span className="label-text">Per page</span></div>
              <select
                className="select select-bordered bg-gray-800 text-white border-none"
                value={perPage}
                onChange={(e) => { setPage(1); setPerPage(Number(e.target.value)) }}
              >
                {[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          </div>

        </div>

       

        <UserTable users={paginated} onRowClick={handleRowClick} />
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
      </motion.div>
    </div>
  )
}
