import Link from 'next/link'

export default function UserTable({ users, onRowClick }) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-base-100">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover cursor-pointer" onClick={() => onRowClick(u.id)}>
              <td>{u.id}</td>
              <td>
                <Link
                  href={`/users/${u.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="link link-primary"
                >
                  {u.name}
                </Link>
              </td>
              <td>
                <a href={`mailto:${u.email}`} className="link">{u.email}</a>
              </td>
              <td>{u.username}</td>
              <td>
                <a href={`https://${u.website}`} target="_blank" rel="noreferrer" className="badge badge-outline">
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
