import Footer from '@/components/Footer'
import './globals.css'
import Navbar from '@/components/Navbar'


export const metadata = {
title: 'Users Dashboard',
description: 'JSONPlaceholder Users Dashboard built with Next.js + Tailwind + DaisyUI',
}


export default function RootLayout({ children }) {
return (
<html lang="en" data-theme="light">
<body className="min-h-screen flex flex-col">
<Navbar></Navbar>
<main className="w-full mx-auto flex-1 bg-gray-900">
{children}
</main>
<Footer></Footer>
</body>
</html>
)
}