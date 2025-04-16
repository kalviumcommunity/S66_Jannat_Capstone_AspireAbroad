import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const MainNav = () => {
  const token=localStorage.getItem('Token')
  return (
    <div className='h-20 w-full flex justify-center items-center shadow-lg z-50 bg-white  border-b border-gray-300   fixed top-0 left-0  '>
      <div className='w-full flex justify-between items-center h-15'>
        <div className='flex items-center'>
            <img className='h-20 w-20' src={logo} alt='logo'></img>
            <h1 className='text-[#003366] text-2xl' >Aspire<span className='text-[#B52721]'>Abroad</span></h1>
        </div>
        <div className='flex w-100  justify-evenly '>
        <h2 className="text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold"><Link to={'/about'}>About Us</Link></h2>

         <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'>Countries</h2>
         <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'>Contact Us</h2>
         <div className="relative group">
  <h2 className='text-[#003366] font-semibold cursor-pointer group-hover:border-b-2 border-[#B52721]'>
    Services
  </h2>

  {/* Dropdown Menu */}
  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
    <ul className="py-2 text-sm text-[#003366]">
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Chat Application</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" ><Link to={"/appointment"}>Book Appointment</Link></li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Consultation</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">More Services</li>
    </ul>
  </div>
</div>
        </div>
        
        <div className='flex justify-center'>
        {token ? (
            // If token exists, show profile avatar and link to profile page
            <div className='flex items-center group relative'>
              <Link to={'/profile'}><img
                src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png" // Replace with the user's avatar URL if available
                alt="User Avatar"
                className="w-20 h-20 rounded-full mr-3 cursor-pointer"
              /></Link>
              <div className="absolute right-1 top-15 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
    <ul className="py-2 text-sm text-[#003366]">
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" ><Link to={"/profile"}>My Profile</Link></li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" ><Link to={"/dashboard"}>User Dashboard</Link></li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
    </ul>
  </div>
              
            </div>
          ) : (
            // If no token, show Login and Signup buttons
            <>
              <button className='bg-[#003366] p-2 h-11 w-20 text-white rounded-2xl cursor-pointer font-semibold'>
                <Link to='/login'>Login</Link>
              </button>
              <button className='bg-[#B52721] p-2 w-20 h-11 text-white rounded-2xl ml-3 mr-1 cursor-pointer font-semibold'>
                <Link to='/signup'>Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainNav
