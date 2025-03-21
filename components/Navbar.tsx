import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'



const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full   z-50 backdrop-blur-lg">
    <div className='flex flex-row justify-between max-w-6xl mx-auto p-8 '>
        <h1 className='text-[#ff6e14] text-2xl' >
            <Link href={"/"}>Leboncoin</Link>
        </h1>
        <div className='flex items-center gap-4'>
            <Link href={"/sellers"}>
                <span className=' bg-gradient-to-r hover:from-teal-500 hover:via-orange-500 hover:to-yellow-500 hover:text-transparent bg-clip-text'>Contact sellers</span>
            </Link>
            
            <ModeToggle />
        </div>
    </div>
    </div>
  )
}

export default Navbar