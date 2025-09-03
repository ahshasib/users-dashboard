'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaBuilding,
  FaMapMarkerAlt,
  FaIdBadge,
  FaArrowLeft,
} from 'react-icons/fa'
import Loading from '@/components/Loading'
import ErrorPage from '@/components/ErrorPage'

export default function UserDetailPage() {
  const params = useParams()
  const { id } = params
  const router = useRouter()
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

  if (loading) return <div><Loading></Loading></div>
  if (error) return <div><ErrorPage></ErrorPage></div>
  if (!user) return <div className="p-6 text-gray-300">User not found</div>

  return (
    <div className="relative min-h-screen bg-gray-900 flex justify-center items-center px-4 overflow-hidden">
      {/* Radio-wave type subtle background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-gray-800/40 blur-[80px] w-[800px] h-[800px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-gray-700/20 blur-[120px] w-[1000px] h-[1000px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl bg-gray-900/95 backdrop-blur-md text-gray-100 shadow-xl p-8 space-y-6 z-10 "
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:opacity-90 py-2 px-6 cursor-pointer"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 text-transparent bg-clip-text font-bold">
            👤 User Details
          </h1>
          <p className="text-gray-300 text-lg">Detailed information of the selected user</p>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Here you can see all personal, contact, address and company information of this user fetched from <span className="font-semibold text-gray-200">JSONPlaceholder API</span>.
          </p>
        </div>

        {/* Info Section */}
        <div className="grid gap-4">
          <InfoItem icon={<FaIdBadge className='text-violet-500'/>} label="ID" value={user.id} />
          <InfoItem icon={<FaUser className='text-violet-500'/>} label="Name" value={user.name} />
          <InfoItem icon={<FaUser className='text-violet-500'/>} label="Username" value={user.username} />
          <InfoItem icon={<FaEnvelope className='text-violet-500'/>} label="Email" value={user.email} />
          <InfoItem icon={<FaPhone className='text-violet-500'/>} label="Phone" value={user.phone} />
          <InfoItem icon={<FaGlobe className='text-violet-500'/>} label="Website" value={user.website} />
          <InfoItem
            icon={<FaMapMarkerAlt className='text-violet-500'/>}
            label="Address"
            value={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
          />
          <InfoItem
            icon={<FaBuilding className='text-violet-500'/>}
            label="Company"
            value={`${user.company.name} — ${user.company.catchPhrase}`}
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
      whileHover={{ scale: 1.03 }}
      className="flex items-start gap-3 bg-gray-800/80 px-4 py-3 shadow-md hover:shadow-lg transition "
    >
      <div className="text-gray-300 text-lg mt-1">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </motion.div>
  )
}
