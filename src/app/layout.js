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
<main className="w-full mx-auto flex-1">
{children}
</main>
<footer className="border-t">
<div className="container mx-auto px-4 py-6 text-sm opacity-70">
JSONPlaceholder Users Dashboard • Next.js + Tailwind + DaisyUI
</div>
</footer>
</body>
</html>
)
}