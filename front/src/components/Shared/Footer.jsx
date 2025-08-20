import React from 'react'
function Footer() {
  return (
    <footer className='w-full border-t border-gray-100 bg-white mt-10'>
      <div className='max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-gray-700'>
        <p className='font-semibold'>© {new Date().getFullYear()} يخوان</p>
      </div>
    </footer>
  )     
}

export default Footer