import React from 'react'
import { NavLink } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <div className="w-screen h-screen m-0 bg-gray-200 flex justify-center items-center flex-col">
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-9xl font-bold text-blue-300 absolute'>404</h1>
            <p className='text-7xl z-10 text-blue-500 font-semibold text-center'>404 PAGE NOT FOUND</p>
        </div>
        <div className='mt-10'>
        <NavLink to='/' className='rounded-lg hover:bg-blue-800 px-4 py-2 bg-blue-700 block text-white font-medium'>Go back to home</NavLink>
        </div>
        </div>
  )
}

export default Pagenotfound