import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-green-400 h-14 items-center'>
      <div className='text-xl font-bold mx-10'>
        PassMan
      </div >
        <ul className='flex gap-4 mx-10'>
            <li className='cursor-pointer hover:font-bold'><a>Home</a></li>
            <li className='cursor-pointer hover:font-bold'><a>About</a></li>
            <li className='cursor-pointer hover:font-bold'><a>Contact</a></li>
        </ul>
        <button className='text-white bg-green-400 w-14 overflow-hidden'>
            <img src="/icons/github.svg" alt=""  className=' p-5 w-55'/>
        </button>
       
    </nav>
  )
}

export default Navbar