import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const MainNav = () => {
  return (
    <div className='h-20 w-full flex justify-center items-center shadow-lg z-10 bg-white  border-b border-gray-300  fixed top-0 left-0 '>
      <div className='w-full flex justify-between items-center h-15'>
        <div className='flex items-center'>
            <img className='h-20 w-20' src={logo} alt='logo'></img>
            <h1 className='text-[#003366] text-2xl' >Aspire<span className='text-[#B52721]'>Abroad</span></h1>
        </div>
        <div className='flex w-100  justify-evenly '>
        <h2 className="text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold"><Link to={'/about'}>About Us</Link></h2>

         <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'>Countries</h2>
         <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'>Contact Us</h2>
         <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'>Services</h2>
        </div>
        
        <div className='flex justify-center'>
        <button className='bg-[#003366] p-2 h-11 w-20 text-white rounded-2xl cursor-pointer font-semibold '>
            <h2><Link to='/enroll'>Enroll</Link></h2></button>
        <button className='bg-[#B52721] p-2 w-20 h-11 text-white rounded-2xl ml-3 mr-1 cursor-pointer font-semibold '>
            <h2>
            <Link to='/stepIn'>StepIn</Link>

            </h2>
            </button>
        </div>
      </div>
    </div>
  )
}

export default MainNav
