import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import globe from '../assets/Globe.webp'

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:0710/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        navigate('/admin');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <>
    <div className="min-h-screen  relative flex flex-col w-full items-center justify-center p-4 font-sans text-center">
      <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${globe})`, backgroundPosition: '50% 9%' }}
        ></div>
        <div className='relative z-10'>
        <MainNav/>
      <h2 className="text-4xl font-extrabold text-[#003366] mb-2 md:text-5xl">
        Hi Jannat! Welcome to your secure dashboard.
      </h2>
      {/* <p className="text-lg text-gray-600 mb-10 max-w-2xl  leading-relaxed md:text-xl ">
        Your insights drive our progress. Let's get to work!
      </p> */}

      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center w-full max-w-md ml-90 mt-9">
        <p className="text-lg text-gray-700 mb-4">Please enter your password to continue:</p>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full py-3 px-6 bg-[#B52721] text-xl text-white cursor-pointer hover:bg-[#003366]"
          >
          Login
        </button>
      </div>
    </div>
            </div>
    <Footer/>
            </>
  );
};

export default AdminDashboard;