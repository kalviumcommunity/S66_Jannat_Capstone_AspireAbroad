import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaBars, FaTimes } from 'react-icons/fa';

const MainNav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkAuthentication = () => {
    if (!token) {
      navigate("/enroll");
      return false;
    }
    return true;
  };

  const handleApplyClick = () => {
    if (!checkAuthentication()) return;
    navigate(`/appointment`);
  };

  const handleLoggedOut = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('userID');
    navigate('/');
  };

  return (
    <div className='w-full bg-white fixed top-0 left-0 z-50 shadow-md border-b border-gray-300'>
      <div className='max-w-8xl mx-auto px-4 flex justify-between items-center h-20'>

      
        <div className='flex items-center'>
          <img
            className='h-25 w-25 cursor-pointer'
            onClick={() => navigate('/')}
            src={logo}
            alt='logo'
          />
          <h1 className='ml-2 text-[#003366] text-4xl font-bold'>
            Aspire<span className='text-[#B52721]'>Abroad</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-6'>
          <Link className='text-[#003366] hover:border-b-2 border-[#B52721] font-semibold' to="/about">About Us</Link>
          <HashLink className='text-[#003366] hover:border-b-2 border-[#B52721] font-semibold' to="#countries">Countries</HashLink>
          <HashLink className='text-[#003366] hover:border-b-2 border-[#B52721] font-semibold' to="#footer">Contact Us</HashLink>

      
          <div className="relative group">
            <h2 className='text-[#003366] font-semibold cursor-pointer group-hover:border-b-2 border-[#B52721]'>Services</h2>
            <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
              <ul className="py-2 text-sm text-[#003366]">
                <li className="px-4 py-2 hover:bg-gray-100"><Link to="/chat">Chat Application</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleApplyClick}>Book Appointment</li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link to="/preparation">Exam Preparation</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link to="/blog">Immigration News</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link to="/assistance">Accommodation Help</Link></li>
              </ul>
            </div>
          </div>
        </div>

 
        <div className='hidden md:flex items-center space-x-3'>
          {token ? (
            <div className='relative group'>
              <Link to="/profile">
                <img
                  src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
                  className="w-20 h-20 rounded-full cursor-pointer"
                  alt="User Avatar"
                />
              </Link>
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
                <ul className="py-2 text-sm text-[#003366]">
                  <li className="px-4 py-2 hover:bg-gray-100"><Link to="/profile">My Profile</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-100"><Link to="/dashboard">User Dashboard</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLoggedOut}>Logout</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link to='/enroll' className='bg-[#003366] px-4 py-3 text-white rounded-2xl font-semibold'>Enroll</Link>
              <Link to='/stepIn' className='bg-[#B52721] px-4 py-3 text-white rounded-2xl font-semibold'>Step In</Link>
              <Link to='/adminDashboard' className='bg-yellow-600 px-4 py-3 text-white rounded-2xl font-semibold'>Admin</Link>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className='md:hidden'>
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className='text-[#003366]'>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white shadow-md'>
          <ul className='flex flex-col p-4 space-y-4 text-[#003366] font-semibold'>
            <Link to='/about' onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <HashLink to='#countries' onClick={() => setMobileMenuOpen(false)}>Countries</HashLink>
            <HashLink to='#footer' onClick={() => setMobileMenuOpen(false)}>Contact Us</HashLink>
            <details className='group'>
              <summary className='cursor-pointer'>Services</summary>
              <ul className='ml-4 mt-2 space-y-2 text-sm'>
                <li><Link to='/chat'>Chat Application</Link></li>
                <li className="cursor-pointer" onClick={handleApplyClick}>Book Appointment</li>
                <li><Link to='/preparation'>Exam Preparation</Link></li>
                <li><Link to='/blog'>Immigration News</Link></li>
                <li><Link to='/assistance'>Accommodation Help</Link></li>
              </ul>
            </details>
            {token ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLoggedOut} className='text-left'>Logout</button>
              </>
            ) : (
              <>
                <Link to='/enroll' onClick={() => setMobileMenuOpen(false)} className='text-[#003366]'>Enroll</Link>
                <Link to='/stepIn' onClick={() => setMobileMenuOpen(false)} className='text-[#B52721]'>Step In</Link>
                <Link to='/adminDashboard' onClick={() => setMobileMenuOpen(false)} className='text-yellow-600'>Admin</Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainNav;
