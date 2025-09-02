import UsersPageClient from '@/components/UsersPageClient'


async function getUsers() {
const res = await fetch('https://jsonplaceholder.typicode.com/users', {
cache: 'no-store',
})
if (!res.ok) throw new Error('Failed to fetch users')
return res.json()
}


export default async function UsersPage() {
const users = await getUsers()
return <UsersPageClient users={users} />
}