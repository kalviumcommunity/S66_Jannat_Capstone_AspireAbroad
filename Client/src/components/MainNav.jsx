import React from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';



const MainNav = () => {
  const navigate=useNavigate()
  const token=localStorage.getItem('Token')
  const checkAuthentication = () => {
    if (!token) {
      navigate("/enroll");
      return false;
    }
    return true;
  };

  const handleApplyClick = () => {
    if (!checkAuthentication()) {
      return; 
    }

    navigate(`/appointment`);
  };

  const handleLoggedOut=()=>{
    localStorage.removeItem('Token');
    localStorage.removeItem('userID')
    navigate('/')
  }
  return (
    <div className='h-20 w-full flex justify-center items-center shadow-lg z-50 bg-white  border-b border-gray-300   fixed top-0 left-0  '>
      <div className='w-full flex justify-between items-center h-15'>
        <div className='flex items-center'>
            <img className='h-20 w-20' src={logo} alt='logo'></img>
            <h1 className='text-[#003366] text-2xl' >Aspire<span className='text-[#B52721]'>Abroad</span></h1>
        </div>
        <div className='flex w-100  justify-evenly '>
        <h2 className="text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold"><Link to={'/about'}>About Us</Link></h2>

         <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'><Link to={'/countries'}>Countries</Link></h2>
         <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'><HashLink to="#footer">Contact Us</HashLink></h2>
         <div className="relative group">
  <h2 className='text-[#003366] font-semibold cursor-pointer group-hover:border-b-2 border-[#B52721]'>
    Services
  </h2>

  {/* Dropdown Menu */}
  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
    <ul className="py-2 text-sm text-[#003366]">
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Chat Application</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleApplyClick}>Book Appointment</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Exam Preparation (IELTS, TOEFL, PTE etc.)</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={"/blog"}>Immigration News & Updates</Link></li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Accommodation Search Assistance</li>
    </ul>
  </div>
</div>
        </div>
        
        <div className='flex justify-center'>
        {token ? (
            
            <div className='flex items-center group relative'>
              <Link to={'/profile'}><img
                src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png" 
                alt="User Avatar"
                className="w-20 h-20 rounded-full mr-3 cursor-pointer"
              /></Link>
              <div className="absolute right-1 top-15 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
    <ul className="py-2 text-sm text-[#003366]">
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" ><Link to={"/profile"}>My Profile</Link></li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" ><Link to={"/dashboard"}>User Dashboard</Link></li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLoggedOut}>Logout</li>
    </ul>
  </div>
              
            </div>
          ) : (
          
            <>
              <button className='bg-[#003366] p-2 h-11 w-20 text-white rounded-2xl cursor-pointer font-semibold'>
                <Link to='/enroll'>Enroll</Link>
              </button>
              <button className='bg-[#B52721] p-2 w-20 h-11 text-white rounded-2xl ml-3 mr-1 cursor-pointer font-semibold'>
                <Link to='/stepIn'>Step In</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainNav
