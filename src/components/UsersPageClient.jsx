'use client'


import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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


// Read initial values from URL
useEffect(() => {
const q = searchParams.get('q') || ''
const p = parseInt(searchParams.get('page') || '1', 10)
const limit = parseInt(searchParams.get('limit') || '5', 10)
setQuery(q)
setPage(Number.isNaN(p) ? 1 : p)
setPerPage([5, 10, 20].includes(limit) ? limit : 5)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


// Update URL when query/page/perPage changes
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


return (
<div className="space-y-6">
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
<h1 className="text-2xl font-bold">Users</h1>
<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
<SearchBar value={query} onChange={setQuery} placeholder="Search by name or email" />
<label className="form-control max-w-xs">
<div className="label"><span className="label-text">Per page</span></div>
<select
className="select select-bordered"
value={perPage}
onChange={(e) => { setPage(1); setPerPage(Number(e.target.value)) }}
>
{[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
</select>
</label>
</div>
</div>


<div className="stats shadow w-full">
<div className="stat">
<div className="stat-title">Total Users</div>
<div className="stat-value">{total}</div>
</div>
</div>
<UserTable users={paginated} onRowClick={handleRowClick} />
    <Pagination page={currentPage} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
  </div>
)
}