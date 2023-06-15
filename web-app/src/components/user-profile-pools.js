import React from 'react'
import { Link } from 'react-router-dom'

const UserPools = () => {
  return (
    <div className='break-words w-full h-full flex flex-col justify-center items-center gap-1 text-center'>
        <svg width="81" height="85" viewBox="0 0 81 85" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M40.98 44C53.1302 44 62.98 34.1503 62.98 22C62.98 9.84974 53.1302 0 40.98 0C28.8297 0 18.98 9.84974 18.98 22C18.98 34.1503 28.8297 44 40.98 44ZM49.23 22L40.98 13.75L32.73 22L40.98 30.25L49.23 22Z" fill="#404A67"></path><path d="M2.5 63.1986C12.9105 63.1986 20.7173 53.0581 20.7173 53.0581C20.7173 53.0581 28.5241 63.1986 38.9346 63.1986C49.3409 63.1986 59.7514 53.0581 59.7514 53.0581C59.7514 53.0581 70.1619 63.1986 77.9687 63.1986M2.5 82.2504C12.9105 82.2504 20.7173 72.1099 20.7173 72.1099C20.7173 72.1099 28.5241 82.2504 38.9346 82.2504C49.3409 82.2504 59.7514 72.1099 59.7514 72.1099C59.7514 72.1099 70.1619 82.2504 77.9687 82.2504" stroke="#98A1C0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <div>
            <p className='text-lg text-black'>No pools yet</p>
            <p className='text-sm'>Open a new position or create a pool to get started.</p>
        </div>
        <button className='bg-uni-dark-pink text-white flex justify-center py-2 px-5 rounded-xl mt-6'>
            <Link to={"/pools"} className="w-full text-center">+ New Position</Link>
        </button>
    </div>
  )
}

export default UserPools
