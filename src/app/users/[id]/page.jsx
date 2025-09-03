'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaBuilding, FaMapMarkerAlt, FaIdBadge } from 'react-icons/fa'

export default function UserDetailPage() {
  const params = useParams()
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

  if (loading) return <div className="p-6 text-white">Loading...</div>
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>
  if (!user) return <div className="p-6 text-gray-300">User not found</div>

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-gray-800 text-gray-100 shadow-lg p-8 space-y-6"
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500">
          User Details
        </h1>

        {/* Info */}
        <div className="space-y-4">
          <InfoItem icon={<FaIdBadge />} label="ID" value={user.id} />
          <InfoItem icon={<FaUser />} label="Name" value={user.name} />
          <InfoItem icon={<FaUser />} label="Username" value={user.username} />
          <InfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
          <InfoItem icon={<FaPhone />} label="Phone" value={user.phone} />
          <InfoItem icon={<FaGlobe />} label="Website" value={user.website} />
          <InfoItem
            icon={<FaMapMarkerAlt />}
            label="Address"
            value={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
          />
          <InfoItem
            icon={<FaBuilding />}
            label="Company"
            value={`${user.company.name} - ${user.company.catchPhrase}`}
          />
        </div>
      </motion.div>
    </div>
  )
}

/* Reusable Info Item */
function InfoItem({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 bg-gray-700 px-4 py-3 shadow-sm transition"
    >
      <div className="text-pink-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </motion.div>
  )
}
