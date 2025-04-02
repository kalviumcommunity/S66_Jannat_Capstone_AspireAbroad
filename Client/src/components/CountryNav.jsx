import React from 'react';
import AusFlag from "../assets/AusFlag.png";
import CanFlag from "../assets/Can.png";
import UKFlag from "../assets/Uk.png";
import USAFlag from "../assets/USFlag.png";

const CountryNav = ({ name }) => {

  const images = [
    { country: 'Australia', src: AusFlag },
    { country: 'Canada', src: CanFlag },
    { country: 'UK', src: UKFlag },
    { country: 'USA', src: USAFlag },
  ];

  
  const countryImage = images.find(image => image.country === name);

  return (
    <div className='h-20 w-full flex justify-center items-center shadow-lg z-10 bg-white border-b border-gray-300 relative'>
      <div className='h-full w-full flex items-center justify-between px-4'>
    
        <div className='flex items-center'>
          {countryImage ? (
            <img src={countryImage.src} alt={countryImage.country} width={80} height={80} />
          ) : (
            <h1>Country not found</h1>
          )}
          <h1 className='ml-3 text-2xl text-[#003366]'>{name}</h1>
        </div>

 
        <div className='flex space-x-8'>
          <h2 className="text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold">About Us</h2>
          <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'>Countries</h2>
          <h2 className='text-[#003366] hover:border-b-2 border-[#B52721] cursor-pointer font-semibold'>Contact Us</h2>
        </div>

        {/* Buttons */}
        <div className='flex justify-center'>
          <button className='bg-[#003366] p-2 h-11 w-20 text-white rounded-2xl cursor-pointer font-semibold'>
            <h2>Enroll</h2>
          </button>
          <button className='bg-[#B52721] p-2 w-20 h-11 text-white rounded-2xl ml-3 cursor-pointer font-semibold'>
            <h2>StepIn</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryNav;
