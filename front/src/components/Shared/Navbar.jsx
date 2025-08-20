import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between'>
        <Link to="/" className='text-2xl font-extrabold text-gray-900'>يخوان</Link>
        <nav className='flex items-center gap-6 text-gray-700'>
        </nav>
      </div>
    </div>
  )
}

export default Navbar