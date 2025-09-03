'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import UserTable from './UserTable'
import { FaUser } from 'react-icons/fa'
import Loading from './Loading'

export default function UsersPageClient({ users: initialUsers }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [users, setUsers] = useState(initialUsers || [])
  const [loading, setLoading] = useState(!initialUsers) // loading true if no initial data
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

  // Filtered users
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

  // Simulate data loading if initialUsers is not provided
  useEffect(() => {
    if (!initialUsers) {
      setLoading(true)
      // simulate fetch delay
      const timer = setTimeout(() => {
        setUsers(users) // here you would fetch from API
        setLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [initialUsers])

  if (loading) {
    return (
      <div >
       <Loading></Loading>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full p-10 overflow-hidden bg-gray-900 text-white">

      {/* Page content */}
      <motion.div
        className="relative z-10 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Gradient heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 text-transparent bg-clip-text">
              Users
            </h1>

            {/* Total users card */}
            <div className="flex items-center gap-3 bg-gray-800 w-48 p-3 justify-between shadow-md">
              <div className="flex items-center gap-2">
                <FaUser className="text-purple-400 text-lg md:text-xl" />
                <div className="text-gray-300 uppercase text-sm font-medium">
                  Total Users:
                </div>
              </div>
              <div className="text-white text-xl md:text-2xl font-semibold">
                {total}
              </div>
            </div>
          </div>

          <div className="flex flex-col  sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Bar */}
            <div className="flex items-center w-full sm:w-72 bg-gray-800 text-white px-3 py-2 shadow-md focus-within:ring-2 focus-within:ring-purple-500">
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search by name or email"
              />
            </div>

            {/* Per Page Selector */}
            <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 shadow-md">
              <span className="text-gray-300 text-sm font-medium">Per page</span>
              <select
                className="cursor-pointer  text-sm px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={perPage}
                onChange={(e) => {
                  setPage(1)
                  setPerPage(Number(e.target.value))
                }}
              >
                {[5, 10, 20].map((n) => (
                  <option key={n} value={n} className='text-gray-700'>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <UserTable users={paginated} onRowClick={handleRowClick} />
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
      </motion.div>
    </div>
  )
}
