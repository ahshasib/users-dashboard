'use client' // আমরা client component বানাচ্ছি কারণ useEffect/useState use করতে পারি

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function UserDetailPage() {
  const params = useParams() // dynamic route থেকে id পাবে
  const { id } = params
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        if (!res.ok) throw new Error('Failed to fetch user')
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!user) return <div className="p-4">User not found</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">User Details</h1>
      <div><strong>ID:</strong> {user.id}</div>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Username:</strong> {user.username}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Phone:</strong> {user.phone}</div>
      <div><strong>Website:</strong> {user.website}</div>
      <div>
        <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
      </div>
      <div>
        <strong>Company:</strong> {user.company.name} - {user.company.catchPhrase}
      </div>
    </div>
  )
}
