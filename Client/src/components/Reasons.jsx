import React from 'react';
import Swiperimg from './Swiperimg';

const Reasons = () => {
  return (
    <div className='flex flex-col md:flex-row mt-16 w-full space-y-4 md:space-y-0 md:space-x-4'>
      
      <div className='border border-gray-300 h-auto w-full md:w-[30%] p-6 bg-red-700 text-white rounded-lg shadow-lg'>
        <div className='mb-6'>
          <h2 className='text-3xl text-[#003366] font-bold mb-4'>Quick and Easy Process</h2>
          <p className='text-gray-200'>Our immigration process is designed to be quick and easy, ensuring that you can move forward with your plans without unnecessary delays.</p>
          <hr className='mt-4 text-black'/>
        </div>
        
        <div className='mb-6'>
          <h2 className='text-3xl text-[#003366] font-bold mb-4'>99% Visa Approvals</h2>
          <p className='text-gray-200'>We are proud to offer a 99% visa approval rate, demonstrating our commitment to guiding you through the immigration process with precision and expertise.</p>
          <hr className='mt-4 text-black'/>
        </div>
        
        <div>
          <h2 className='text-3xl text-[#003366] font-bold mb-4'>Expert Guidance Throughout Your Journey</h2>
          <p className='text-gray-200'>From start to finish, we provide expert guidance throughout your entire immigration journey. Our team of experienced professionals is dedicated to supporting you every step of the way, offering personalized advice tailored to your unique situation.</p>
          <hr className='mt-4 text-black'/>
        </div>
      </div>
      

      <div className='bg-[#003366] w-full md:w-[70%] p-8 h-auto rounded-lg shadow-lg'>
        <h2 className='text-5xl font-semibold mb-8 text-white'>Why Choose Us for Your Immigration Journey!</h2>
        <Swiperimg />
      </div>
      
    </div>
  );
}

export default Reasons;
