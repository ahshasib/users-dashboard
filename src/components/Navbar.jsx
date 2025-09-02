import Link from 'next/link'


export default function Navbar() {
return (
<div className="navbar bg-base-100 border-b sticky top-0 z-40">
<div className="container mx-auto px-4">
<div className="flex-1">
<Link href="/" className="btn btn-ghost normal-case text-xl">Users Dashboard</Link>
</div>
<div className="flex-none">
<ul className="menu menu-horizontal px-1">
<li><Link href="/users">Users</Link></li>
<li>
<a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer" className="opacity-80">
API
</a>
</li>
</ul>
</div>
</div>
</div>
)
}