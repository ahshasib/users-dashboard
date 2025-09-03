import Link from 'next/link'

export default function UserTable({ users, onRowClick }) {
  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 text-white">
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="cursor-pointer transition transform hover:scale-101 hover:bg-gradient-to-r hover:from-violet-400 hover:via-purple-200 hover:to-indigo-300 hover:text-black border-b border-gray-800"
              onClick={() => onRowClick(u.id)}
            >
              <td className="px-6 py-4">{u.id}</td>
              <td className="px-6 py-4">
                <Link
                  href={`/users/${u.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {u.name}
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-200 hover:text-gray-700 font-bold">
                <a href={`mailto:${u.email}`} className=" hover:underline ">
                  {u.email}
                </a>
              </td>
              <td className="px-6 py-4 font-bold">{u.phone}</td>
              <td className="px-6 py-4">
                <a
                  href={`https://${u.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                >
                  {u.website}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
